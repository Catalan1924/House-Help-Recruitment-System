import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user,setUser]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const loadUser=async()=>{

            const{

                data:{session}

            }=await supabase.auth.getSession();

            setUser(session?.user??null);

            setLoading(false);

        }

        loadUser();

        const{

            data:{subscription}

        }=

        supabase.auth.onAuthStateChange(

            (_,session)=>{

                setUser(session?.user??null);

            }

        );

        return()=>subscription.unsubscribe();

    },[]);

    return(

        <AuthContext.Provider

            value={{

                user,

                loading,

                setUser

            }}

        >

            {children}

        </AuthContext.Provider>

    )

}

export const useAuth=()=>useContext(AuthContext);