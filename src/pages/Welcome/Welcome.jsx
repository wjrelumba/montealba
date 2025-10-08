import React, { useEffect, useState, useCallback } from 'react'
import { useMedia } from '../../contextProviders/MediaProvider';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contextProviders/ThemeProvider';
import { useUser } from '../../contextProviders/UserProvider';

export default function Welcome() {
    const isMobile = useMedia();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const {signedIn} = useUser();

    // States
    const [isVisible, setIsVisible] = useState(true);
    const [renderedSource, setRenderedSource] = useState(theme === 'light' ? '/Logo_Light_Mode.png' : '/Logo_Dark_Mode.png');
    const [nextSource, setNextSource] = useState(null);

    // Function to navigate to a page
    const navigateTo = (pageLink) => {
      navigate(`/${pageLink}`)
    };

    // Determine the next desired image path
    const desiredSource = theme === 'light' ? '/Logo_Light_Mode.png' : '/Logo_Dark_Mode.png';

    // Handle image loading before rendering
    const handleImageLoad = useCallback(() => {
        if (nextSource) {
            setRenderedSource(nextSource);
            setNextSource(null);

            const timeoutId = setTimeout(() => setIsVisible(true), 300);
            return () => clearTimeout(timeoutId);
        }
    }, [nextSource]);
    
    // Use effect to check for them changes
    useEffect(() => {
        if (desiredSource === renderedSource) {
            return;
        }
        setIsVisible(false);
        setNextSource(desiredSource); 

    }, [theme, desiredSource, renderedSource]);

    // Check if user is signed in
    useEffect(() => {
      if(signedIn){
        navigate('/dashboard/orders');
      }
    },[signedIn])


    // Mobile Render
    if(isMobile){
        return (
            <div className='w-full h-[80%] flex flex-col items-center justify-center'>
                <div className={`w-[65%] rounded-full`}>
                    {/* The image that is actually displayed to the user */}
                    <img
                        className={`transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        key={renderedSource}
                        src={renderedSource}
                        alt="Theme Logo"
                    />
                    {/* Image Preloader: This element loads the new image source invisibly. */}
                    {nextSource && (
                        <img
                            key={nextSource} // Important: new key forces mount/load
                            src={nextSource}
                            onLoad={handleImageLoad}
                            style={{ display: 'none' }} // Ensure it's never visible
                            alt="" // Optional: Keep alt empty for preloader
                        />
                    )}

                </div>
                {/* <div className={`w-[65%] p-[0.1rem] mb-4 ${theme == 'light' ? 'bg-[#182217]' : 'bg-[#ffefcb]'}`}/> */}
                <div className='w-[75%] flex justify-center gap-2'>
                  <button onClick={() => navigateTo('signup')} className='px-3 py-1 rounded-full w-[6rem]'>Sign Up</button>
                  <button onClick={() => navigateTo('login')} className='px-3 py-1 rounded-full w-[6rem]'>Log In</button>
                </div>
            </div>
        )
    }
    // PC or Tablet landscape render
    else {
        return (
            <div className='w-full h-[80%] flex flex-col items-center justify-center'>
                <div className={`w-[25%] rounded-full`}>
                    
                    {/* The image that is actually displayed to the user */}
                    <img
                        className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        key={renderedSource}
                        src={renderedSource}
                        alt="Theme Logo"
                    />

                    {/* Image Preloader: This element loads the new image source invisibly. */}
                    {nextSource && (
                        <img
                            key={nextSource} // Important: new key forces mount/load
                            src={nextSource}
                            onLoad={handleImageLoad}
                            style={{ display: 'none' }} // Ensure it's never visible
                            alt="" // Optional: Keep alt empty for preloader
                        />
                    )}

                </div>
                {/* <div className={`w-[65%] p-[0.1rem] mb-4 ${theme == 'light' ? 'bg-[#182217]' : 'bg-[#ffefcb]'}`}/> */}
                <div className='w-[75%] flex justify-center gap-2'>
                  <button onClick={() => navigateTo('signup')} className='px-3 py-1 rounded-full w-[6rem]'>Sign Up</button>
                  <button onClick={() => navigateTo('login')} className='px-3 py-1 rounded-full w-[6rem]'>Log In</button>
                </div>
            </div>
        )
    }
}