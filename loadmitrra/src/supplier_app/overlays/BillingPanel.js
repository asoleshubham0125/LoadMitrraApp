import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierPanelWrapper from "./PanelWrapper";
import api from "../../api/axios";
import { useSupplierAuth } from "../context/SupplierAuthContext";

export default function BillingPanel() {
  const { supplierId } = useParams();
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const { supplier, token } = useSupplierAuth();

  useEffect(() => {
    if (!supplier) return;

    fetchBilling();
  }, [supplierId, supplier]);

  const fetchBilling = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/load/supplier/${supplierId}/billing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoads(res.data);
    } catch (err) {
      console.error("Failed to fetch billing", err);
      setLoads([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (loadId) => {
    try {
      await api.put(`/load/pay/${loadId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBilling(); // refresh billing panel
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Payment failed. Try again.";
      alert(errorMessage);
    }
  };

  return (
    <SupplierPanelWrapper title="Billing">
      <div className="p-3">
        {loading && <p className="text-muted">Loading billing data...</p>}

        {!loading && loads.length === 0 && (
          <p className="text-muted">No billing records</p>
        )}

        {loads.map((load) => {
          const canPay =
            load.status === "reached_destination" &&
            load.paymentStatus === "pending";

          return (
            <div key={load._id} className="mb-3 p-3 border rounded">
              {/* ROUTE */}
              <div className="mt-2 d-flex gap-3">
                {/* LEFT: DOT + FLEX LINE */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {/* FROM DOT */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: "2px solid #9ca3af",
                      marginTop: 6,
                    }}
                  />

                  {/* FLEX LINE */}
                  <div
                    style={{
                      flex: 1,
                      width: 2,
                      background: "#d1d5db",
                      margin: "4px 0",
                    }}
                  />

                  {/* TO DOT */}
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

                {/* RIGHT: TEXT CONTENT */}
                <div className="small">
                  <div className="text-muted fw-semibold">FROM</div>
                  <div className="fw-semibold">{load.from}</div>

                  <div className="text-muted fw-semibold mt-3">TO</div>
                  <div className="fw-semibold">{load.to}</div>
                </div>
              </div>

              {/* META */}
              <div className="text-muted small">
                {load.vehicle.category} · {load.vehicle.bodyType} ·{" "}
                {load.weight}kg
              </div>

              {/* STATUS */}
              <div className="small mt-1">
                Status: <strong>{load.status.replace("_", " ")}</strong>
              </div>

              {/* FOOTER */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="fw-bold text-primary">₹{load.price}</div>

                {canPay && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handlePay(load._id)}
                  >
                    Pay Now
                  </button>
                )}

                {!canPay && load.paymentStatus === "paid" && (
                  <span className="badge bg-success">Paid</span>
                )}

                {!canPay &&
                  load.status === "completed" &&
                  load.paymentStatus === "paid" && (
                    <span className="badge bg-primary">Completed</span>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </SupplierPanelWrapper>
  );
}
