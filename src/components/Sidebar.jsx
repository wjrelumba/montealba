import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../contextProviders/SidebarProvider'
import { useTheme } from '../contextProviders/ThemeProvider';
import supabase from '../supabase/supabase';

export default function Sidebar() {
    const {sidebarOpen, setSidebarOpen} = useSidebar();
    const {theme, toggleTheme} = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        {
            name: 'Orders',
            url: 'orders',
        },{
            name: 'Create Order',
            url: 'createOrder',
        },
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Sign out function
    const signOutUser = async() => {
        setSidebarOpen(false);
        await supabase.auth.signOut();
    };

    // Navigation function
    const navigateTo = (urlValue) => {
        navigate(`/dashboard/${urlValue}`);
        toggleSidebar();
    };

  return (
    <div className={`h-full absolute w-[9rem] flex flex-col p-2 z-20 ${theme == 'light' ? 'bg-[#c0b395]' : 'bg-[#0c110c]'} ${sidebarOpen ? 'left-0' : 'left-[-9rem]'} transition-all ease-in-out duration-200`}>
        <div className='w-full grid grid-cols-2'>
            <div className='flex items-center justify-start'>
                <div onClick={toggleTheme}>
                    {theme === 'light' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    )}
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        </div>
        {/* Navigation div */}
        <div className='mt-5 flex flex-col gap-3'>
            {navLinks.map((data, index) => (
                <div onClick={() => navigateTo(data.url)} key={index} className={`${location.pathname == (`/dashboard/${data.url}`) ? 'border-b-[2px]' : ''}`}>
                    <h1>{data.name}</h1>
                </div>
            ))}
        </div>
        <div className='mt-5 flex flex-col'>
            <div>
                <button onClick={signOutUser} className='px-2 rounded-xl'>Sign Out</button>
            </div>
        </div>
    </div>
  )
}
