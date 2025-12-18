import { createContext, useContext, useEffect, useState } from "react";

const DriverAuthContext = createContext(null);

export function DriverAuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔄 Restore session on refresh */
  useEffect(() => {
    const storedAuth = localStorage.getItem("driver_auth");

    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setToken(parsed.token);
      setDriver(parsed.driver);
    }

    setLoading(false);
  }, []);

  /* ✅ LOGIN */
  const login = ({ token, driver }) => {
    localStorage.setItem("driver_auth", JSON.stringify({ token, driver }));

    setToken(token);
    setDriver(driver);
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    localStorage.removeItem("driver_auth");

    setToken(null);
    setDriver(null);

    window.location.href = "/auth/login";
  };

  return (
    <DriverAuthContext.Provider
      value={{
        token,
        driver,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </DriverAuthContext.Provider>
  );
}

export function useDriverAuth() {
  return useContext(DriverAuthContext);
}
