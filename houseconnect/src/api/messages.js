import { supabase } from "../lib/supabase";

/**
 * Get all conversations for the current user.
 * Returns unique conversations with the last message and participant info.
 */
export const getConversations = async (userId) => {
  const { data, error } = await supabase
    .from("conversations")
    .select(
      "*, participant1:participant1_id(id, full_name), participant2:participant2_id(id, full_name), last_message:last_message_id(*)"
    )
    .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get all messages in a conversation, ordered by creation time.
 */
export const getMessages = async (conversationId) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Send a message in a conversation.
 */
export const sendMessage = async (conversationId, senderId, text) => {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      text,
    })
    .select()
    .single();

  if (error) throw error;

  // Update the conversation's last_message_id
  await supabase
    .from("conversations")
    .update({ last_message_id: data.id, updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  return data;
};

/**
 * Create a new conversation between two users.
 */
export const createConversation = async (participant1Id, participant2Id) => {
  // Check if conversation already exists
  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .or(
      `and(participant1_id.eq.${participant1Id},participant2_id.eq.${participant2Id}),and(participant1_id.eq.${participant2Id},participant2_id.eq.${participant1Id})`
    )
    .maybeSingle();

  if (existing) return existing;

  // Create new conversation
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      participant1_id: participant1Id,
      participant2_id: participant2Id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Mark all messages in a conversation as read for the current user.
 */
export const markAsRead = async (conversationId, userId) => {
  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("read", false);

  if (error) throw error;
};

/**
 * Get unread message count for the current user.
 */
export const getUnreadCount = async (userId) => {
  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .neq("sender_id", userId)
    .eq("read", false);

  if (error) throw error;
  return count;
};

/**
 * Subscribe to new messages in a conversation (realtime).
 * Returns the unsubscribe function.
 */
export const subscribeToMessages = (conversationId, callback) => {
  const subscription = supabase
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => callback(payload.new)
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
};

/**
 * Subscribe to new conversations (realtime).
 * Returns the unsubscribe function.
 */
export const subscribeToConversations = (userId, callback) => {
  const subscription = supabase
    .channel(`conversations:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations",
        filter: `participant1_id=eq.${userId}`,
      },
      (payload) => callback(payload)
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "conversations",
        filter: `participant2_id=eq.${userId}`,
      },
      (payload) => callback(payload)
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
};
