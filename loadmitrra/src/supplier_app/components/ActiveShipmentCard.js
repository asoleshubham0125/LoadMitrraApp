import { shipmentStatusConfig } from "../utils/shipmentStatusConfig";

export default function ActiveShipmentCard({ shipment }) {
  const ui = shipmentStatusConfig[shipment.status];

  return (
    <div
      className={`card mb-3 shadow-sm ${ui.border}`}
      style={{ borderRadius: "14px" }}
    >
      <div className="card-body">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={`badge ${ui.badge}`}>
            <span
              className={`me-2 rounded-circle d-inline-block ${ui.dot}`}
              style={{ width: 8, height: 8 }}
            />
            {shipment.status}
          </span>

          <span className="text-muted small">Load #{shipment.loadId}</span>
        </div>

        {/* ROUTE */}
        <div className="fw-semibold fs-6">
          {shipment.from} → {shipment.to}
        </div>

        {/* META */}
        {shipment.meta && (
          <div className="text-muted small mt-1">{shipment.meta}</div>
        )}

        {/* ETA */}
        {shipment.eta && (
          <div className={`small mt-2 ${ui.accent}`}>ETA {shipment.eta}</div>
        )}

        {/* FOOTER */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {shipment.driver && (
            <div className="d-flex align-items-center gap-2">
              <img
                src={shipment.driver.avatar}
                alt=""
                width="28"
                height="28"
                className="rounded-circle"
              />
              <span className="small text-muted">{shipment.driver.name}</span>
            </div>
          )}

          {shipment.action && (
            <button className="btn btn-outline-secondary btn-sm">
              {shipment.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
