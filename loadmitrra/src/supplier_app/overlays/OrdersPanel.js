import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { useSupplierAuth } from "../context/SupplierAuthContext";
import SupplierPanelWrapper from "./PanelWrapper";

export default function OrdersPanel() {
  const { supplierId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { supplier, token } = useSupplierAuth();

  useEffect(() => {
    if (!supplier) return;

    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // refresh every 5 seconds

    return () => clearInterval(interval);
  }, [supplierId, supplier]);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/load/supplier/${supplierId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ ONLY COMPLETED LOADS
      const completed = res.data.filter(
        (order) => order.status === "completed"
      );

      setOrders(completed);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupplierPanelWrapper title="Orders">
      <div className="p-3">
        {loading && <div className="text-muted">Loading orders...</div>}

        {!loading && orders.length === 0 && (
          <div className="text-muted">No completed orders</div>
        )}

        {orders.map((order) => (
          <div key={order._id} className="mb-3 p-3 rounded border">
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
                <div className="fw-semibold">{order.from}</div>

                <div className="text-muted fw-semibold mt-3">TO</div>
                <div className="fw-semibold">{order.to}</div>
              </div>
            </div>

            <div className="text-muted small">
              Completed on{" "}
              {new Date(order.completedAt).toLocaleDateString("en-IN")}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-2">
              <span className="fw-bold">₹{order.price}</span>
              <span className="badge bg-secondary-subtle text-secondary">
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>
    </SupplierPanelWrapper>
  );
}
