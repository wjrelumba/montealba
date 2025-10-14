import React, { useEffect } from 'react'
import { useUser } from '../../../contextProviders/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const {signedIn} = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
          if(!signedIn){
              navigate('/');
          };
      },[signedIn]);
  return (
    <div>CreateOrder</div>
  )
}
