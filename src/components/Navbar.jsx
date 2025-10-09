import React, { useEffect } from 'react'
import { useTheme } from '../contextProviders/ThemeProvider'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../contextProviders/SidebarProvider';
import { useMedia } from '../contextProviders/MediaProvider';
import useNavLinks from '../customHooks/useNavLinks';

export default function Navbar() {
    const {theme, toggleTheme} = useTheme();
    const location = useLocation();
    const {sidebarOpen, setSidebarOpen} = useSidebar();
    const isMobile = useMedia();
    const navigate = useNavigate();

    const navLinks = useNavLinks();

    useEffect(() => {
        console.log(location.pathname);
    },[location]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Navigation function
    const navigateTo = (urlValue) => {
        navigate(`/dashboard/${urlValue}`);
    };
    
    if(isMobile) return (
    <div className={`w-full h-[3.5rem] navbar sticky top-0 grid grid-cols-3 z-10`}>
        {(location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/')) ? (
            <div className='w-full flex items-center justify-start px-2'>
                <div onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>
            </div>
        ):(
            <div className='w-full flex items-center justify-start px-2'>
                <div onClick={toggleTheme}>
                    {theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    )}
                </div>
            </div>
        )}
    </div>
  );

  if(!isMobile) return (
    <div className={`w-full h-[3.5rem] navbar sticky top-0 grid grid-cols-${navLinks.length + 1} z-10`}>
        <div className='w-full flex items-center justify-start px-2'>
            <div onClick={toggleTheme}>
                {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                )}
            </div>
        </div>
        {navLinks.map((data, index) => (
            <div onClick={() => navigateTo(data.url)} key={index} className={`w-full flex justify-center items-center ${location.pathname == (`/dashboard/${data.url}`) ? 'border-b-[2px]' : ''}`}>
                <h1>{data.name}</h1>
            </div>
        ))}
    </div>
  )
}
