import { useNavigate, useParams } from "react-router-dom";

export default function PanelWrapper({ title, children }) {
  const navigate = useNavigate();
  const { driverId } = useParams(); // ✅ get driverId from URL

  return (
    <div
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        width: "400px",
        height: "calc(100% - 32px)",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <strong>{title}</strong>

        <span
          className="material-symbols-outlined"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/driver/${driverId}`)}
        >
          close
        </span>
      </div>

      {/* BODY */}
      <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
    </div>
  );
}
