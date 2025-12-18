import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DriverSidebar from "../components/DriverSidebar";
import DriverMap from "../components/DriverMap";
import { DriverProvider } from "../context/DriverContext";
import { DriverMapProvider } from "../context/DriverMapContext";
import { useDriverAuth } from "../context/DriverAuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function DriverWebLayout() {
  const { driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const { token } = useDriverAuth();

  useEffect(() => {
    if (!token || !driverId) return;

    axios
      .get(`${API_BASE_URL}/driver/${driverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDriver(res.data))
      .catch((err) => console.error("Driver fetch error:", err));
  }, [driverId, token]);

  if (!driver) return <div>Loading driver...</div>;

  return (
    <DriverProvider driver={driver}>
      <DriverMapProvider>
        <div style={{ display: "flex", height: "100vh" }}>
          <DriverSidebar />

          <div style={{ flex: 1, position: "relative" }}>
            <DriverMap />
            <Outlet />
          </div>
        </div>
      </DriverMapProvider>
    </DriverProvider>
  );
}
