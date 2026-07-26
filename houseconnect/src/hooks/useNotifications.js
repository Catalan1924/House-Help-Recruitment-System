import { useState, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

/**
 * Fetch notifications for the current user.
 */
const fetchNotifications = async (userId) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return data;
};

/**
 * Fetch unread notification count.
 */
const fetchUnreadCount = async (userId) => {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw error;
  return count || 0;
};

/**
 * Mark a notification as read.
 */
const markNotificationRead = async (notificationId) => {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  if (error) throw error;
};

/**
 * Mark all notifications as read for a user.
 */
const markAllNotificationsRead = async (userId) => {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw error;
};

/**
 * Hook: fetch notifications for the current user.
 */
export const useNotifications = (userId) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId),
    enabled: !!userId,
    refetchInterval: 30_000,
  });
};

/**
 * Hook: get unread notification count.
 */
export const useUnreadCount = (userId) => {
  return useQuery({
    queryKey: ["unreadNotificationCount", userId],
    queryFn: () => fetchUnreadCount(userId),
    enabled: !!userId,
    refetchInterval: 15_000,
  });
};

/**
 * Hook: mark a single notification as read.
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: (_, notificationId, context) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
    },
  });
};

/**
 * Hook: mark all notifications as read.
 */
export const useMarkAllAsRead = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      queryClient.invalidateQueries({
        queryKey: ["unreadNotificationCount", userId],
      });
    },
  });
};

/**
 * Hook: subscribe to realtime notifications.
 * Returns the latest notification received via realtime.
 */
export const useNotificationSubscription = (userId) => {
  const queryClient = useQueryClient();
  const [latestNotification, setLatestNotification] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setLatestNotification(payload.new);
          queryClient.invalidateQueries({
            queryKey: ["notifications", userId],
          });
          queryClient.invalidateQueries({
            queryKey: ["unreadNotificationCount", userId],
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return latestNotification;
};
