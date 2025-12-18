import { useEffect, useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { getLoadHistory } from "../services/driverApi";
import { useDriverAuth } from "../context/DriverAuthContext";

export default function HistoryPanel() {
  const { driver } = useDriverAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!driver) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const driverId = driver._id || driver.id;
        const res = await getLoadHistory(driverId);
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [driver]);

  if (!driver) return null;

  return (
    <PanelWrapper title="History" count={history.length}>
      <div className="px-3 mt-3">
        {loading && <div className="text-muted">Loading history…</div>}

        {!loading && history.length === 0 && (
          <div className="text-muted">No completed trips yet</div>
        )}

        {history.map((load) => (
          <div
            key={load._id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "12px",
              background: "#fff",
            }}
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

            {/* DATE */}
            <div className="text-muted small">
              Completed on{" "}
              {load.completedAt
                ? new Date(load.completedAt).toLocaleDateString("en-IN")
                : "-"}
            </div>

            {/* FOOTER */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="fw-bold">₹{load.price}</div>

              <span
                className={`badge text-uppercase ${
                  load.paymentStatus === "paid"
                    ? "bg-success"
                    : "bg-warning text-dark"
                }`}
              >
                {load.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}
