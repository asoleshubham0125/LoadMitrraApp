import { NavLink, useParams, useNavigate } from "react-router-dom";
import ProfileAvatar from "../../driver_app/components/ProfileAvatar";
import logo from "../../assets/LoadMitrra.png";
import { useSupplierAuth } from "../context/SupplierAuthContext";

export default function SupplierSidebar() {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const { supplier, logout } = useSupplierAuth();

  const linkClass =
    "nav-link d-flex align-items-center gap-2 text-dark fw-medium";

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="border-end p-3 d-flex flex-column"
      style={{ width: "280px", background: "#ffffff" }}
    >
      {/* LOGO */}
      <div className="d-flex align-items-center mb-3">
        <img src={logo} alt="LoadMitrra" style={{ width: "46px" }} />
        <div className="ms-2">
          <span className="fw-semibold fs-5 text-primary">Load</span>
          <span className="fw-semibold fs-5 text-dark">Mitrra</span>
        </div>
      </div>

      <div className="text-muted mb-3">Supplier Portal</div>

      {/* PROFILE */}
      {supplier && (
        <div className="d-flex align-items-center gap-3 mb-4">
          <ProfileAvatar name={supplier.name} />
          <div>
            <div className="fw-semibold">{supplier.name}</div>
            <div className="text-muted small">⭐ 4.9 Rating</div>
          </div>
        </div>
      )}

      {/* CREATE LOAD */}
      <button
        className="btn btn-primary w-100 mb-4 d-flex align-items-center justify-content-center gap-2"
        onClick={() => navigate(`/supplier/${supplierId}/create-load`)}
      >
        <span className="material-symbols-outlined">add</span>
        Create Load
      </button>

      {/* NAVIGATION */}
      <nav className="nav flex-column gap-2 flex-grow-1">
        <NavLink to={`/supplier/${supplierId}/shipments`} className={linkClass}>
          <span className="material-symbols-outlined">local_shipping</span>
          Active Shipments
        </NavLink>

        <NavLink to={`/supplier/${supplierId}/orders`} className={linkClass}>
          <span className="material-symbols-outlined">list_alt</span>
          Orders
        </NavLink>

        <NavLink to={`/supplier/${supplierId}/billing`} className={linkClass}>
          <span className="material-symbols-outlined">payments</span>
          Billing
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <div
        onClick={handleLogout}
        className="d-flex align-items-center gap-2 text-danger"
        style={{
          marginTop: "auto",
          paddingTop: "16px",
          borderTop: "1px solid #e5e7eb",
          cursor: "pointer",
        }}
      >
        <span className="material-symbols-outlined">logout</span>
        Logout
      </div>
    </div>
  );
}
