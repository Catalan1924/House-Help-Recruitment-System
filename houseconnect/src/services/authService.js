import { supabase } from "../lib/supabase";

/*
=========================================
SIGN UP
=========================================
*/

export async function signUp({
  email,
  password,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

/*
=========================================
SIGN IN
=========================================
*/

export async function signIn({
  email,
  password,
}) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

/*
=========================================
SIGN OUT
=========================================
*/

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/*
=========================================
CURRENT SESSION
=========================================
*/

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}

/*
=========================================
CURRENT USER
=========================================
*/

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}

/*
=========================================
RESET PASSWORD
=========================================
*/

export async function resetPassword(email) {
  const { data, error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          "http://localhost:5173/reset-password",
      }
    );

  if (error) {
    throw error;
  }

  return data;
}