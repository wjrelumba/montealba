import { createContext, useContext, useEffect, useState } from "react";

const MediaContext = createContext();

const MediaProvider = ({children}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = '(max-width: 960px)';

        const mql = window.matchMedia(mediaQuery);

        setIsMobile(mql.matches);

        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        mql.addEventListener('change', handleMediaQueryChange);

        return () => {
            mql.removeEventListener('change', handleMediaQueryChange);
        }
    },[])

    return (
        <MediaContext.Provider value={isMobile}>
            {children}
        </MediaContext.Provider>
    );
};

export default MediaProvider;

// Create a custom hook for checking media
export const useMedia = () => {
    return useContext(MediaContext);
};