import { createContext, useState, useContext } from "react";
// Custom Context of is sidebar expanded or not
// Create Context
const SidebarContext = createContext();

// Create Provider Component
export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);
