import { createConversation, sendMessage, getMessages } from "../api/messages";

/**
 * Start a conversation with an employer (from a worker).
 */
export const startConversationWithEmployer = async (workerId, employerId, initialMessage) => {
  const conversation = await createConversation(workerId, employerId);

  if (initialMessage) {
    await sendMessage(conversation.id, workerId, initialMessage);
  }

  return conversation;
};

/**
 * Get formatted messages for display in chat UI.
 */
export const getFormattedMessages = async (conversationId) => {
  const messages = await getMessages(conversationId);

  return messages.map((msg) => ({
    id: msg.id,
    text: msg.text,
    senderId: msg.sender_id,
    timestamp: msg.created_at,
    read: msg.read,
    isOwn: false, // Will be set by the UI based on current user
  }));
};

/**
 * Group messages by date for chat dividers.
 */
export const groupMessagesByDate = (messages) => {
  const groups = {};

  messages.forEach((msg) => {
    const date = new Date(msg.timestamp || msg.created_at).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
  });

  return groups;
};
