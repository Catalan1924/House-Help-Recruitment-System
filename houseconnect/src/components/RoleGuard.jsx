import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ role, children }) => {

    const { user, userRole, loading } = useAuth();

    // Wait for auth context to fully initialize (user + role)
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    // Auth context is ready but userRole might still be resolving
    // Only redirect if we're certain the role doesn't match
    if (userRole && userRole !== role) {
        return <Navigate to="/" replace />;
    }

    // If user exists but role is still null, show loading
    // (the AuthContext effect is still fetching the role)
    if (user && !userRole) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Verifying access...</p>
            </div>
        );
    }

    // No user at all — let AuthGuard handle the redirect
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RoleGuard;