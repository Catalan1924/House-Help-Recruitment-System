import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  signIn as apiSignIn,
  signUp as apiSignUp,
  signOut as apiSignOut,
  resetPassword as apiResetPassword,
  updatePassword as apiUpdatePassword,
} from "../api/auth";
import { getUserRole } from "../api/users";

/**
 * Login mutation.
 * On success, redirects to role-based dashboard.
 */
export const useLogin = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => apiSignIn(email, password),
    onSuccess: async (data) => {
      setUser(data.user);
      toast.success("Welcome back!");

      try {
        const role = await getUserRole(data.user.id);
        navigate(`/${role}/dashboard`, { replace: true });
      } catch {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed. Please check your credentials.");
    },
  });
};

/**
 * Register mutation.
 * Returns the auth data; profile creation is handled separately.
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: ({ email, password }) => apiSignUp(email, password),
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });
};

/**
 * Logout mutation.
 */
export const useLogout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiSignOut,
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    },
  });
};

/**
 * Reset password mutation.
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email) => apiResetPassword(email),
    onSuccess: () => {
      toast.success("Password reset email sent! Check your inbox.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });
};

/**
 * Update password mutation (after reset).
 */
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (newPassword) => apiUpdatePassword(newPassword),
  });
};

/**
 * Get the current user from AuthContext.
 */
export const useCurrentUser = () => {
  const { user, userRole, loading } = useAuth();
  return { user, role: userRole, isLoading: loading };
};
