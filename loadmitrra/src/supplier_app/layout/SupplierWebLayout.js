import { Outlet } from "react-router-dom";
import SupplierSidebar from "../components/SupplierSidebar";
import SupplierMap from "../components/SupplierMap";

export default function SupplierWebLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* SIDEBAR */}
      <SupplierSidebar />

      {/* MAP CONTAINER */}
      <div style={{ flex: 1, position: "relative" }}>
        <SupplierMap />

        {/* 🔥 THIS IS THE KEY */}
        <Outlet />
      </div>
    </div>
  );
}
