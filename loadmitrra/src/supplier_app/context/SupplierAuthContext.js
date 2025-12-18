import { createContext, useContext, useEffect, useState } from "react";

const SupplierAuthContext = createContext(null);

export function SupplierAuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔄 Restore session on refresh */
  useEffect(() => {
    const storedAuth = localStorage.getItem("supplier_auth");

    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setToken(parsed.token);
      setSupplier(parsed.supplier);
    }

    setLoading(false);
  }, []);

  /* ✅ LOGIN */
  const login = ({ token, supplier }) => {
    localStorage.setItem("supplier_auth", JSON.stringify({ token, supplier }));

    setToken(token);
    setSupplier(supplier);
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    localStorage.removeItem("supplier_auth");

    setToken(null);
    setSupplier(null);

    window.location.href = "/auth/login";
  };

  return (
    <SupplierAuthContext.Provider
      value={{
        token,
        supplier,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </SupplierAuthContext.Provider>
  );
}

export function useSupplierAuth() {
  return useContext(SupplierAuthContext);
}

