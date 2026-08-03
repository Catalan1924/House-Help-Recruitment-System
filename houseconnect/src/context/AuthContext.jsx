import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { getUserRole } from "../services/userService";

const AuthContext = createContext();

const VALID_ROLES = ["worker", "employer", "admin"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch role whenever user changes.
  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setUserRole(null);
        return;
      }

      // 1. Try from user_metadata first (set during signup, immediately available)
      const metaRole = user.user_metadata?.role;
      if (metaRole && VALID_ROLES.includes(metaRole)) {
        setUserRole(metaRole);
      }

      // 2. Now try the database (authoritative source)
      try {
        const dbRole = await getUserRole(user.id);
        if (dbRole && VALID_ROLES.includes(dbRole)) {
          setUserRole(dbRole);
        } else if (!metaRole) {
          // No metadata fallback and DB didn't return a valid role
          setUserRole(null);
        }
      } catch {
        // DB query failed — keep the metadata fallback if we set it above,
        // otherwise clear.
        if (!metaRole) {
          setUserRole(null);
        }
      }
    };

    fetchRole();
  }, [user]);

  // Listen to auth state changes
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async ({ email, password, options = {} }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    if (error) throw error;
    return data;
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    // Immediately set the user so guards don't flash redirect
    setUser(data.user);
    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setUserRole(null);
  }, []);

  const value = {
    user,
    userRole,
    loading,
    setUser,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
