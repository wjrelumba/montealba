import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext();

export default function SidebarProvider( {children} ) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const value = {
        sidebarOpen,
        setSidebarOpen,
    }

  return (
    <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider>
  )
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};