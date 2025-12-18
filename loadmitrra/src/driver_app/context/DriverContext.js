import { createContext, useContext, useEffect, useState } from "react";
import { getMyLoads, getEarningsSummary } from "../services/driverApi";
import { useDriverAuth } from "./DriverAuthContext";

const DriverContext = createContext(null);

export const DriverProvider = ({ children }) => {
  const { driver } = useDriverAuth();

  const [myLoads, setMyLoads] = useState([]);
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔄 Fetch Driver Dashboard Data */
  useEffect(() => {
    if (!driver) return;

    const driverId = driver._id || driver.id;

    const fetchDashboardData = async () => {
      try {
        const [loadsRes, earningsRes] = await Promise.all([
          getMyLoads(driverId),
          getEarningsSummary(driverId),
        ]);

        setMyLoads(loadsRes.data);
        setEarnings(earningsRes.data);
      } catch (err) {
        console.error("Driver dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [driver]);

  return (
    <DriverContext.Provider
      value={{
        driver,
        myLoads,
        earnings,
        loading,
        refreshLoads: () => {
          const driverId = driver?._id || driver?.id;
          return getMyLoads(driverId).then((r) => setMyLoads(r.data));
        },
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => useContext(DriverContext);
