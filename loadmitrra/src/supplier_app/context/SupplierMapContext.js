import { createContext, useContext, useState } from "react";

const SupplierMapContext = createContext();

export function SupplierMapProvider({ children }) {
  const [route, setRoute] = useState({
    from: "",
    to: "",
  });

  return (
    <SupplierMapContext.Provider value={{ route, setRoute }}>
      {children}
    </SupplierMapContext.Provider>
  );
}

export function useSupplierMap() {
  return useContext(SupplierMapContext);
}
