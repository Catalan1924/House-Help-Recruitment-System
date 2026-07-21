import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { getUserRole } from "../services/userService";

const RoleGuard = ({ role, children }) => {

    const { user } = useAuth();

    const [userRole, setUserRole] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user) return;

        const loadRole = async () => {

            const roleName = await getUserRole(user.id);

            setUserRole(roleName);

            setLoading(false);

        };

        loadRole();

    }, [user]);

    if (loading) return <p>Loading...</p>;

    if (userRole !== role) {

        return <Navigate to="/" replace />;

    }

    return children;

};

export default RoleGuard;