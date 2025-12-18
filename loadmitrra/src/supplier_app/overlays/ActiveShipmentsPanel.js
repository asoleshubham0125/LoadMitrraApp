import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useSupplierAuth } from "../context/SupplierAuthContext";
import SupplierPanelWrapper from "./PanelWrapper";
import { shipmentStatusConfig } from "../utils/shipmentStatusConfig";

/**
 * Backend status → UI status mapping
 * MUST match keys in shipmentStatusConfig
 */
const STATUS_MAP = {
  posted: "Finding Driver",
  assigned: "Scheduled",
  in_transit: "In Transit",
  reached_destination: "Reached Destination",
};

export default function ActiveShipmentsPanel() {
  const { supplierId } = useParams();
  const navigate = useNavigate(); // ✅ FIX
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { supplier, token } = useSupplierAuth();

  useEffect(() => {
    if (!supplier) return;

    fetchLoads();
    // eslint-disable-next-line
  }, [supplierId, supplier]);

  const fetchLoads = async () => {
    try {
      const res = await api.get(`/load/supplier/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      /**
       * ACTIVE = everything except completed / cancelled
       */
      const activeLoads = res.data.filter(
        (l) => l.status !== "completed" && l.status !== "cancelled"
      );

      setLoads(activeLoads);
    } catch (err) {
      console.error("Failed to fetch active shipments", err);
      setLoads([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupplierPanelWrapper title="Active Shipments">
      <div className="p-3">
        {loading && <div className="text-muted">Loading shipments...</div>}

        {!loading && loads.length === 0 && (
          <div className="text-muted">No active shipments</div>
        )}

        {loads.map((load) => {
          const uiStatus = STATUS_MAP[load.status] || "Unknown";

          /**
           * Fallback UI to prevent crashes
           */
          const statusUI = shipmentStatusConfig[uiStatus] || {
            badge: "bg-secondary-subtle text-secondary",
            dot: "bg-secondary",
            accent: "text-secondary",
            border: "",
          };

          return (
            <div
              key={load._id}
              className={`mb-3 p-3 rounded border ${statusUI.border}`}
            >
              {/* ROUTE */}
              <div className="mt-2 d-flex gap-3">
                {/* LEFT: DOT + LINE */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: "2px solid #9ca3af",
                      marginTop: 6,
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                      width: 2,
                      background: "#d1d5db",
                      margin: "4px 0",
                    }}
                  />

                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#f97316",
                      marginBottom: 6,
                    }}
                  />
                </div>

                {/* RIGHT: TEXT */}
                <div className="small">
                  <div className="text-muted fw-semibold">FROM</div>
                  <div className="fw-semibold">{load.from}</div>

                  <div className="text-muted fw-semibold mt-3">TO</div>
                  <div className="fw-semibold">{load.to}</div>
                </div>
              </div>

              {/* LOAD DETAILS */}
              <div className="text-muted small mt-2">
                {load.vehicle?.category} · {load.vehicle?.bodyType} ·{" "}
                {load.weight}kg
              </div>

              {/* DRIVER */}
              {load.driverId && (
                <div className="text-muted small mt-1">
                  Driver: {load.driverId?.name ?? "Assigned"}
                </div>
              )}

              {/* FOOTER */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="fw-bold">₹{load.price}</span>
                <span className={`badge ${statusUI.badge}`}>{uiStatus}</span>
              </div>

              {/* CHAT BUTTON */}
              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 mt-2"
                onClick={() =>
                  navigate(`/supplier/${supplierId}/chat/${load._id}`)
                }
              >
                <span className="material-symbols-outlined">chat</span>
                Chat
              </button>
            </div>
          );
        })}
      </div>
    </SupplierPanelWrapper>
  );
}
