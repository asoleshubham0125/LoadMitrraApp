import { useEffect, useState } from "react";
import { useDriverMap } from "../context/DriverMapContext";

export default function DriverMap() {
  const { route } = useDriverMap();

  const [location, setLocation] = useState({
    lat: 13.0827, // Chennai fallback
    lng: 80.2707,
  });

  const [permissionDenied, setPermissionDenied] = useState(false);

  /* 📍 LIVE LOCATION (only when NOT in route mode) */
  useEffect(() => {
    if (route) return; // ⛔ stop live tracking when showing route

    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Location access denied", error);
        setPermissionDenied(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, [route]);

  /* 🧠 MAP SRC DECISION */
  let mapSrc = "";

  if (route?.from && route?.to) {
    // 🚚 ROUTE MODE (My Loads → Details)
    mapSrc = `https://www.google.com/maps?saddr=${encodeURIComponent(
      route.from
    )}&daddr=${encodeURIComponent(route.to)}&output=embed`;
  } else {
    // 📍 LIVE MODE
    mapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;
  }

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {/* MAP */}
      <iframe
        key={route ? `${route.from}-${route.to}` : "live"} // ✅ force refresh
        title="Driver Map"
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
      />

      {/* LOCATION WARNING */}
      {!route && permissionDenied && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            padding: "8px 14px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: "13px",
          }}
        >
          Location access denied. Showing default location.
        </div>
      )}
    </div>
  );
}
