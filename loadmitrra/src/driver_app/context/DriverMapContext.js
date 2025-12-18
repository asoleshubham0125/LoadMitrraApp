import { createContext, useContext, useState } from "react";

const DriverMapContext = createContext();

export function DriverMapProvider({ children }) {
  const [route, setRoute] = useState(null); // null = live mode

  return (
    <DriverMapContext.Provider value={{ route, setRoute }}>
      {children}
    </DriverMapContext.Provider>
  );
}

export function useDriverMap() {
  return useContext(DriverMapContext);
}
