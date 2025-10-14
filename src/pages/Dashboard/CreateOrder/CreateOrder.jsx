import React, { useEffect } from 'react'
import { useUser } from '../../../contextProviders/UserProvider';

export default function CreateOrder() {
  const {signedIn} = useUser();
  
  useEffect(() => {
          if(!signedIn){
              navigate('/');
          };
      },[signedIn]);
  return (
    <div>CreateOrder</div>
  )
}
