import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }) => {

    const{

        user,

        loading

    }=useAuth();

    if(loading){

        return <p>Loading...</p>;

    }

    if(!user){

        return <Navigate to="/login"/>;

    }

    return children;

}

export default AuthGuard;