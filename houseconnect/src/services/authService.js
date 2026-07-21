import { supabase } from "../lib/supabase";

/**
 * Register a new user
 */
export const signUp = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

/**
 * Login
 */
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

/**
 * Logout
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

/**
 * Current User
 */
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
};

/**
 * Current Session
 */
export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;

  return session;
};