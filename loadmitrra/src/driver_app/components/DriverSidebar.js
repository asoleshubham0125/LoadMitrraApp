import { useNavigate, useLocation } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";
import logo from "../../assets/moblogo.png";

import { useDriverAuth } from "../context/DriverAuthContext";
import { useDriver } from "../context/DriverContext";

export default function DriverSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  /* 🔐 AUTH CONTEXT */
  const { driver, logout } = useDriverAuth();

  /* 📦 DRIVER CONTEXT (dashboard data if needed later) */
  useDriver(); // keeps context subscribed (no direct use needed here)

  const driverId = driver?._id || driver?.id;
  const name = driver?.name || "Driver";

  const isActive = (path) => location.pathname.startsWith(path);

  if (!driver) return null; // safety guard

  return (
    <div
      style={{
        width: "260px",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="d-flex align-items-center mb-3">
          <img
            src={logo}
            alt="LoadMitrra Logo"
            style={{ width: "44px", marginRight: "8px" }}
          />
          <span
            style={{
              fontWeight: "600",
              fontSize: "1.45rem",
              color: "#4682b4",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Load
          </span>
          <span
            style={{
              fontWeight: "600",
              fontSize: "1.45rem",
              color: "#123456",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Mitrra
          </span>
        </div>

        {/* PROFILE */}
        <div className="mt-4 d-flex align-items-center gap-3">
          <ProfileAvatar name={name} />
          <div>
            <div className="fw-semibold">{name}</div>
            <div className="text-muted small">⭐ 4.9 Rating</div>
          </div>
        </div>

        {/* NAVIGATION */}
        <ul className="nav flex-column mt-4 gap-3">
          <li
            className={`d-flex align-items-center gap-2 ${
              isActive(`/driver/${driverId}/loads`)
                ? "fw-semibold text-primary"
                : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/driver/${driverId}/loads`)}
          >
            <span className="material-symbols-outlined">local_shipping</span>
            Nearby Loads
          </li>

          <li
            className={`d-flex align-items-center gap-2 ${
              isActive(`/driver/${driverId}/my-loads`)
                ? "fw-semibold text-primary"
                : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/driver/${driverId}/my-loads`)}
          >
            <span className="material-symbols-outlined">
              delivery_truck_bolt
            </span>
            My Loads
          </li>

          <li
            className={`d-flex align-items-center gap-2 ${
              isActive(`/driver/${driverId}/earnings`)
                ? "fw-semibold text-primary"
                : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/driver/${driverId}/earnings`)}
          >
            <span className="material-symbols-outlined">
              currency_rupee_circle
            </span>
            Earnings
          </li>

          <li
            className={`d-flex align-items-center gap-2 ${
              isActive(`/driver/${driverId}/history`)
                ? "fw-semibold text-primary"
                : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/driver/${driverId}/history`)}
          >
            <span className="material-symbols-outlined">
              history_toggle_off
            </span>
            History
          </li>
        </ul>
      </div>

      {/* LOGOUT */}
      <div
        onClick={logout}
        style={{
          marginTop: "auto",
          paddingTop: "16px",
          borderTop: "1px solid #e5e7eb",
          cursor: "pointer",
        }}
        className="d-flex align-items-center gap-2 text-danger"
      >
        <span className="material-symbols-outlined">logout</span>
        Logout
      </div>
    </div>
  );
}
