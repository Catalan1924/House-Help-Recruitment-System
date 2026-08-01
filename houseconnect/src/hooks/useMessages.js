import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
  markAsRead,
  getUnreadCount,
  subscribeToMessages,
  subscribeToConversations,
} from "../api/messages";

/**
 * Fetch all conversations for the current user.
 */
export const useConversations = (userId) => {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => getConversations(userId),
    enabled: !!userId,
    refetchInterval: 30_000, // Poll every 30 seconds as fallback
  });
};

/**
 * Fetch all messages in a conversation.
 */
export const useMessages = (conversationId) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });
};

/**
 * Send a message mutation.
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, senderId, text }) =>
      sendMessage(conversationId, senderId, text),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
    },
  });
};

/**
 * Create a conversation mutation.
 */
export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ participant1Id, participant2Id }) =>
      createConversation(participant1Id, participant2Id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

/**
 * Mark messages as read mutation.
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, userId }) =>
      markAsRead(conversationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};

/**
 * Get unread message count.
 */
export const useUnreadCount = (userId) => {
  return useQuery({
    queryKey: ["unreadCount", userId],
    queryFn: () => getUnreadCount(userId),
    enabled: !!userId,
    refetchInterval: 15_000,
  });
};

/**
 * Subscribe to realtime messages in a conversation.
 * Automatically unsubscribes on unmount.
 */
export const useMessageSubscription = (conversationId, onNewMessage) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      // Update cache optimistically
      queryClient.setQueryData(["messages", conversationId], (old = []) => [
        ...old,
        newMessage,
      ]);
      if (onNewMessage) onNewMessage(newMessage);
    });

    return () => unsubscribe();
  }, [conversationId, queryClient, onNewMessage]);
};

/**
 * Subscribe to conversation changes (new conversations, updates).
 */
export const useConversationSubscription = (userId, onUpdate) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToConversations(userId, () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", userId] });
      if (onUpdate) onUpdate();
    });

    return () => unsubscribe();
  }, [userId, queryClient, onUpdate]);
};
