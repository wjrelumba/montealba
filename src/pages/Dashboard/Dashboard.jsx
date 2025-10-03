import React, { useEffect } from 'react'
import { useUser } from '../../contextProviders/UserProvider'
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase/Supabase';

export default function Dashboard() {
    const {signedIn} = useUser();
    const navigate = useNavigate();

    // Sign out function
    const signOutUser = async() => {
        await supabase.auth.signOut();
        navigate('/');
    };

    // Check if user is signed in
    useEffect(() => {
        if(!signedIn){
            navigate('/');
        };

    },[signedIn])
  return (
    <div>
        <button onClick={signOutUser}>Sign out</button>
        <div>
            <h1>Dashboard</h1>
        </div>
    </div>
  )
}
