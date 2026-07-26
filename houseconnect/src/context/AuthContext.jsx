import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

import {
  getCurrentUserProfile,
} from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  /*
  =========================================
  LOAD USER
  =========================================
  */

  useEffect(() => {
    async function loadSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);

          try {
            const userProfile =
              await getCurrentUserProfile(
                session.user.id
              );

            setProfile(userProfile);
          } catch (err) {
            console.error(
              "Profile Load Error:",
              err
            );
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    /*
    =========================================
    AUTH STATE CHANGES
    =========================================
    */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setUser(session.user);

          try {
            const userProfile =
              await getCurrentUserProfile(
                session.user.id
              );

            setProfile(userProfile);
          } catch (err) {
            console.error(
              "Profile Load Error:",
              err
            );

            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /*
  =========================================
  CONTEXT
  =========================================
  */

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        setUser,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
=========================================
HOOK
=========================================
*/

export const useAuth = () => {
  return useContext(AuthContext);
};