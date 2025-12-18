import { useEffect, useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { getEarningsSummary, getTransactions } from "../services/driverApi";
import { useDriverAuth } from "../context/DriverAuthContext";

export default function EarningsPanel() {
  const { driver } = useDriverAuth();

  const [earnings, setEarnings] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!driver) return;

    const driverId = driver._id || driver.id;

    const fetchEarnings = async () => {
      try {
        setLoading(true);

        const [summaryRes, txRes] = await Promise.all([
          getEarningsSummary(driverId),
          getTransactions(driverId),
        ]);

        setEarnings({
          today: summaryRes.data.today,
          thisWeek: summaryRes.data.week,
          thisMonth: summaryRes.data.month,
          transactions: txRes.data.map((tx) => ({
            tripId: tx._id,
            from: tx.from,
            to: tx.to,
            date: tx.completedAt
              ? new Date(tx.completedAt).toLocaleDateString("en-IN")
              : "-",
            amount: tx.price,
            status: tx.paymentStatus === "paid" ? "Paid" : "Pending",
          })),
        });
      } catch (err) {
        console.error("Failed to fetch earnings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [driver]);

  return (
    <PanelWrapper title="Earnings" count={earnings.transactions.length}>
      {/* SUMMARY CARDS */}
      <div className="px-3 pt-3">
        <div className="row g-2">
          <div className="col-4">
            <div className="border rounded p-2 text-center">
              <div className="text-muted small">Today</div>
              <div className="fw-bold text-primary">₹{earnings.today}</div>
            </div>
          </div>

          <div className="col-4">
            <div className="border rounded p-2 text-center">
              <div className="text-muted small">This Week</div>
              <div className="fw-bold text-success">₹{earnings.thisWeek}</div>
            </div>
          </div>

          <div className="col-4">
            <div className="border rounded p-2 text-center">
              <div className="text-muted small">This Month</div>
              <div className="fw-bold text-warning">₹{earnings.thisMonth}</div>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="px-3 mt-4">
        <div className="fw-semibold mb-2">Transactions</div>

        {loading && <div className="text-muted">Loading…</div>}

        {!loading && earnings.transactions.length === 0 && (
          <div className="text-muted">No transactions yet</div>
        )}

        {earnings.transactions.map((tx) => (
          <div
            key={tx.tripId}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            {/* ROUTE (FROM → TO STYLE) */}
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
                <div className="fw-semibold">{tx.from}</div>

                <div className="text-muted fw-semibold mt-3">TO</div>
                <div className="fw-semibold">{tx.to}</div>
              </div>
            </div>

            {/* DATE */}
            <div className="text-muted small">{tx.date}</div>

            {/* FOOTER */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="fw-bold">₹{tx.amount}</div>

              <span
                className={`badge ${
                  tx.status === "Paid" ? "bg-success" : "bg-warning text-dark"
                }`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}
