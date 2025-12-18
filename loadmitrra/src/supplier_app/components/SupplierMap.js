import { useEffect, useState } from "react";
import { useSupplierMap } from "../context/SupplierMapContext";

export default function SupplierMap() {
  const { route } = useSupplierMap();

  // ✅ Chennai fallback
  const [location, setLocation] = useState({
    lat: 13.0827,
    lng: 80.2707,
  });

  const [permissionDenied, setPermissionDenied] = useState(false);

  // 🎯 Get live location when NO route is entered
  useEffect(() => {
    if (route.from || route.to) return; // skip if route exists

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setPermissionDenied(true); // stays Chennai
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, [route]);

  const showRoute = route.from && route.to;

  // 🗺 Map URLs
  const liveMapSrc = `https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`;

  const routeMapSrc = `https://maps.google.com/maps?saddr=${encodeURIComponent(
    route.from
  )}&daddr=${encodeURIComponent(route.to)}&output=embed`;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe
        title="Supplier Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        src={showRoute ? routeMapSrc : liveMapSrc}
      />

      {/* ℹ️ Info banner if location denied */}
      {!showRoute && permissionDenied && (
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
            zIndex: 10,
          }}
        >
          Location access denied. Showing Chennai.
        </div>
      )}
    </div>
  );
}
