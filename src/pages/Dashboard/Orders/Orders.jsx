import React, { useEffect } from 'react'
import { useUser } from '../../../contextProviders/UserProvider'
import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../contextProviders/MediaProvider';

export default function Orders() {
    const {signedIn} = useUser();
    const navigate = useNavigate();
    const isMobile = useMedia();

    // Check if user is signed in
    useEffect(() => {
        if(!signedIn){
            navigate('/');
        };
    },[signedIn]);
}
