import { Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import SupplierWebLayout from "./layout/SupplierWebLayout";
import SupplierMapPage from "./pages/SupplierMapPage";
import ActiveShipmentsPanel from "./overlays/ActiveShipmentsPanel";
import OrdersPanel from "./overlays/OrdersPanel";
import BillingPanel from "./overlays/BillingPanel";
import SettingsPanel from "./overlays/SettingsPanel";
import { SupplierMapProvider } from "./context/SupplierMapContext";
import CreateLoadPanel from "./overlays/CreateLoadPanel";
import PayBillingPanel from "./overlays/PayBillingPanel";
import SupplierChatPanel from "./overlays/ChatPanel";
import { SupplierAuthProvider, useSupplierAuth } from "./context/SupplierAuthContext";

function ProtectedSupplierRoute() {
  const { supplier, loading } = useSupplierAuth();
  const { supplierId } = useParams();

  if (loading) return <div className="p-4">Loading...</div>;

  if (!supplier) {
    return <Navigate to="/auth/login" replace />;
  }

  if (supplier._id !== supplierId && supplier.id !== supplierId) {
    return <Navigate to={`/supplier/${supplier._id || supplier.id}`} replace />;
  }

  return <Outlet />;
}

export default function SupplierApp() {
  return (
    <SupplierAuthProvider>
      <SupplierMapProvider>
        <Routes>
          {/* SUPPLIER ROOT */}
          <Route path="/:supplierId" element={<ProtectedSupplierRoute />}>
            <Route element={<SupplierWebLayout />}>
              {/* MAP PAGE */}
              <Route index element={<SupplierMapPage />} />

              {/* OVERLAYS */}
              <Route
                path="shipments"
                element={<ActiveShipmentsPanel />}
              />
              <Route path="orders" element={<OrdersPanel />} />
              <Route path="billing" element={<BillingPanel />} />
              <Route
                path="billing/:loadId"
                element={<PayBillingPanel />}
              />
              <Route path="settings" element={<SettingsPanel />} />

              <Route path="create-load" element={<CreateLoadPanel />} />

              <Route
                path="chat/:loadId"
                element={<SupplierChatPanel />}
              />

              {/* fallback */}
              <Route path="*" element={<Navigate to="." replace />} />
            </Route>
          </Route>
        </Routes>
      </SupplierMapProvider>
    </SupplierAuthProvider>
  );
}
