import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(location.pathname == '/dashboard'){
            navigate('/dashboard/orders');
        };
    },[location.pathname]);
    
  return (
    <div>
        <Outlet/>
    </div>
  )
}
