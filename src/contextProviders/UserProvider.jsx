import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [signedId, setSignedIn] = useState(false);

    const userValue = signedId;

    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

// Create a custom hook for user data
export const useUser = () => {
    return useContext(UserContext);
};