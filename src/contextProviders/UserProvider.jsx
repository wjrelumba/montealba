import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase/Supabase";

const UserContext = createContext();

const UserProvider = ({children}) => {
    // 1. Use the session object itself for a more reliable check
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state to prevent flickering

    // The derived signedIn status
    const signedIn = !!session;

    useEffect(() => {
        // A. Handle Initial Load (page refresh)
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            setSession(initialSession);
            setLoading(false);
        });

        // B. Listen for Auth Changes (log in, log out, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, currentSession) => {
                // The 'INITIAL_SESSION' event is included here but also handled above.
                // We mainly listen for SIGNED_IN, SIGNED_OUT, and TOKEN_REFRESHED events.
                
                // Set the session object itself. If signed out, this will be null.
                setSession(currentSession);
                
                // If this is the first time the listener runs, ensure loading is set to false
                if (event === 'INITIAL_SESSION') {
                    setLoading(false);
                }
            }
        );

        // Cleanup listener on unmount
        return () => subscription.unsubscribe();
    }, []);

    const value = {
        session, // Provide the full session object
        signedIn,
        loading, // Important for conditionally rendering protected routes
    };

    return (
        <UserContext.Provider value={value}>
            {/* Optionally, only render children once the session check is complete */}
            {!loading && children} 
        </UserContext.Provider>
    );
};

export default UserProvider;

// Create a custom hook for user data
export const useUser = () => {
    return useContext(UserContext);
};