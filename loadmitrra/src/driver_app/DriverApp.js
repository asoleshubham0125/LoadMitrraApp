import { Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import DriverWebLayout from "./layout/DriverWebLayout";
import DriverMapPage from "./pages/DriverMapPage";
import LoadsPanel from "./overlays/LoadsPanel";
import MyLoadsPanel from "./overlays/MyLoadsPanel";
import EarningsPanel from "./overlays/EarningsPanel";
import HistoryPanel from "./overlays/HistoryPanel";
import ChatPanel from "./overlays/ChatPanel";

import { DriverAuthProvider, useDriverAuth } from "./context/DriverAuthContext";
import { DriverProvider } from "./context/DriverContext";

function ProtectedDriverRoute() {
  const { driver, loading } = useDriverAuth();
  const { driverId } = useParams();

  if (loading) return <div className="p-4">Loading...</div>;

  if (!driver) {
    return <Navigate to="/login" replace />;
  }

  if (driver._id !== driverId) {
    return <Navigate to={`/driver/${driver._id}`} replace />;
  }

  return <Outlet />;
}

export default function DriverApp() {
  return (
    <DriverAuthProvider>
      <Routes>
        {/* DRIVER ROOT */}
        <Route path="/:driverId" element={<ProtectedDriverRoute />}>
          <Route element={<DriverWebLayout />}>
            {/* default page */}
            <Route index element={<DriverMapPage />} />

            {/* panels */}
            <Route path="loads" element={<LoadsPanel />} />
            <Route path="my-loads" element={<MyLoadsPanel />} />
            <Route path="earnings" element={<EarningsPanel />} />
            <Route path="history" element={<HistoryPanel />} />
            <Route path="chat/:loadId" element={<ChatPanel />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="loads" replace />} />
          </Route>
        </Route>
      </Routes>
    </DriverAuthProvider>
  );
}
