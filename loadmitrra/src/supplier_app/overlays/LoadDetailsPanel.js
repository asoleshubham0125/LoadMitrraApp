import { useNavigate, useParams } from "react-router-dom";
import SupplierPanelWrapper from "./PanelWrapper";

export default function SupplierLoadDetailsPanel({ load, onClose }) {
  const navigate = useNavigate();
  const { supplierId } = useParams();

  if (!load) return null;

  const driverName = load.driverId?.name || "Unassigned";

  return (
    <SupplierPanelWrapper title={`Load #${load._id.slice(-5)}`} onClose={onClose}>
      <div className="p-3 d-flex flex-column gap-4">
        {/* STATUS */}
        <span className="badge bg-success align-self-start">
          {load.status.replace("_", " ").toUpperCase()}
        </span>

        {/* ROUTE */}
        <div>
          <div className="text-muted small">FROM</div>
          <div className="fw-semibold">{load.from}</div>

          <div className="text-muted small mt-3">TO</div>
          <div className="fw-semibold">{load.to}</div>
        </div>

        {/* DRIVER CARD */}
        {load.driverId ? (
          <div className="border rounded p-3" style={{ background: "#f9fafb" }}>
            <div className="d-flex align-items-center gap-3">
              {/* Avatar */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "#e0edff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {driverName.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <div>
                <div className="fw-semibold">{driverName}</div>
                <div className="text-muted small">⭐ 4.9 rating</div>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 mt-3">
              <a
                href={`tel:${load.driverId.phone}`}
                className="btn btn-outline-primary btn-sm w-50 d-flex align-items-center justify-content-center gap-1"
              >
                <span className="material-symbols-outlined align-middle" style={{fontSize: "16px"}}>call</span>
                Call
              </a>

              <button
                className="btn btn-outline-secondary btn-sm w-50 d-flex align-items-center justify-content-center gap-1"
                onClick={() => navigate(`/supplier/${supplierId}/chat/${load._id}`)}
              >
                <span className="material-symbols-outlined align-middle" style={{fontSize: "16px"}}>chat</span>
                Chat
              </button>
            </div>
          </div>
        ) : (
          <div className="border rounded p-3 text-center text-muted" style={{ background: "#f9fafb" }}>
            Searching for a driver...
          </div>
        )}

        {/* INFO */}
        <div className="row small">
          <div className="col-6">
            <strong>Vehicle</strong>
            <div>
              {load.vehicle.category} · {load.vehicle.bodyType}
            </div>
          </div>

          <div className="col-6">
            <strong>Weight</strong>
            <div>{load.weight} kg</div>
          </div>

          <div className="col-6">
            <strong>Price</strong>
            <div className="fw-bold text-success">₹{load.price}</div>
          </div>

          <div className="col-6">
            <strong>Payment</strong>
            <div>{load.paymentStatus.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </SupplierPanelWrapper>
  );
}
