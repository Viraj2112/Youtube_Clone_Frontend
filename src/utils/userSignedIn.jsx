import { createContext, useState, useContext, useEffect } from "react";
// user Sign in context, user Context
// Create Context
const SignInContext = createContext();

// Create Provider Component
export const SignInProvider = ({ children }) => {
  const [signIn, setSignIn] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);

    // Fetch user data from backend using the token
    const fetchUser = async (token) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/getUser`, {
          headers: {
            "Content-Type": "application/json",
            // Pass token in Authorization header
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // If token is invalid or expired, logout
          logout();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

  // Check on token for initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setSignIn(true);
      fetchUser(token);
    }
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setSignIn(true);
    fetchUser(jwtToken)
  }

  const logout = () => {
    localStorage.removeItem('token');
    setSignIn(false);
    setUser(null);
  }

  return (
    <SignInContext.Provider value={{ signIn, setSignIn, login, logout, user }}>
      {children}
    </SignInContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSignIn = () => useContext(SignInContext);
