import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "./common/Loader";
import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../services/userService";

const RoleGuard = ({ role, children }) => {
  const { user, loading: authLoading } = useAuth();

  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadRole() {
      try {
        const roleName = await getUserRole(user.id);
        setUserRole(roleName);
      } catch (error) {
        console.error(error);
      } finally {
        setRoleLoading(false);
      }
    }

    loadRole();
  }, [user]);

  // Wait for authentication to finish
  if (authLoading) {
    return <Loader />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Still fetching role
  if (roleLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Wrong role
  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleGuard;