import { useEffect, useState, useCallback } from "react";
import PanelWrapper from "./PanelWrapper";
import DriverLoadDetailsPanel from "./LoadDetailsPanel";
import {
  getMyLoads,
  pickupLoad,
  reachedDestination,
  completeLoad,
} from "../services/driverApi";
import { useDriverAuth } from "../context/DriverAuthContext";
import { useDriverMap } from "../context/DriverMapContext";

export default function MyLoadsPanel() {
  const { driver } = useDriverAuth();
  const { setRoute } = useDriverMap();

  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  // Defined logic to fetch loads so it can be reused
  const fetchLoads = useCallback(
    async (isBackground = false) => {
      if (!driver) return;
      const driverId = driver._id || driver.id;

      try {
        if (!isBackground) setLoading(true); // Don't show spinner on background polling
        const res = await getMyLoads(driverId);
        setLoads(res.data);
      } catch (err) {
        console.error("Failed to fetch my loads", err);
      } finally {
        if (!isBackground) setLoading(false);
      }
    },
    [driver]
  );

  /* 🔄 AUTO REFRESH & INITIAL LOAD */
  useEffect(() => {
    console.log("MyLoadsPanel mounted (no earnings UI)");
    // 1. Initial Load
    fetchLoads();

    // 2. Set Polling Interval (e.g., every 15 seconds)
    const intervalId = setInterval(() => {
      fetchLoads(true); // true = background refresh (no loading spinner)
    }, 15000);

    // 3. Cleanup
    return () => clearInterval(intervalId);
  }, [fetchLoads]);

  /* ======================================================
      ACTIONS (With State Refresh)
  ====================================================== */

  const handlePickup = async (id) => {
    try {
      await pickupLoad(id);
      fetchLoads(true); // Refresh list to update button state
    } catch (error) {
      console.error("Pickup failed", error);
    }
  };

  const handleReached = async (id) => {
    try {
      await reachedDestination(id);
      fetchLoads(true);
    } catch (error) {
      console.error("Reached failed", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeLoad(id);
      fetchLoads(true);
    } catch (error) {
      console.error("Completion failed", error);
    }
  };

  /* ======================================================
      UI HELPERS
  ====================================================== */

  const statusColor = (status) => {
    switch (status) {
      case "assigned":
        return "#2563eb"; // Blue
      case "in_transit":
        return "#f59e0b"; // Amber
      case "reached_destination":
        return "#a855f7"; // Purple
      case "completed":
        return "#16a34a"; // Green
      default:
        return "#6b7280"; // Gray
    }
  };

  const openDetails = (load) => {
    setRoute({ from: load.from, to: load.to });
    setSelectedLoad(load);
  };

  const closeDetails = () => {
    setRoute(null);
    setSelectedLoad(null);
  };

  // (earnings removed)

  return (
    <>
      <PanelWrapper title="My Loads" count={loads.length}>
        {/* LOADS LIST */}
        <div className="px-3">
          {loading && (
            <p className="text-muted text-center mt-3">Loading loads...</p>
          )}
          {!loading && loads.length === 0 && (
            <p className="text-muted text-center mt-3">
              No loads assigned yet.
            </p>
          )}

          {loads.map((load) => {
            const canComplete =
              load.status === "reached_destination" &&
              load.paymentStatus === "paid";

            return (
              <div
                key={load._id}
                className="border rounded p-3 mt-3 shadow-sm"
                style={{ background: "#fff" }}
              >
                {/* FROM → TO VISUALIZATION */}
                <div className="d-flex gap-3">
                  <div className="d-flex flex-column align-items-center">
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        border: "2px solid #6b7280",
                        marginTop: 5,
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        width: 2,
                        background: "#e5e7eb",
                        margin: "4px 0",
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#f97316",
                        marginBottom: 5,
                      }}
                    />
                  </div>

                  <div className="small flex-grow-1">
                    <div
                      className="text-muted fw-bold"
                      style={{ fontSize: "0.75rem" }}
                    >
                      PICKUP
                    </div>
                    <div className="fw-semibold text-dark">{load.from}</div>

                    <div
                      className="text-muted fw-bold mt-3"
                      style={{ fontSize: "0.75rem" }}
                    >
                      DROP
                    </div>
                    <div className="fw-semibold text-dark">{load.to}</div>
                  </div>

                  {/* Status Badge Top Right */}
                  <div>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: statusColor(load.status),
                        fontWeight: 500,
                      }}
                    >
                      {load.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* META INFO */}
                <div className="bg-light rounded p-2 mt-3 d-flex gap-3 text-muted small">
                  <span>🚛 {load.vehicle?.category || "Truck"}</span>
                  <span>📦 {load.weight}kg</span>
                  <span>🏷️ {load.vehicle?.bodyType}</span>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <div>
                    <div className="fw-bold fs-5">₹{load.price}</div>
                    {/* Payment Status Indicator */}
                    {load.status === "completed" ? (
                      load.paymentStatus === "paid" ? (
                        <small className="text-success fw-bold">PAID</small>
                      ) : (
                        <small className="text-danger fw-bold">UNPAID</small>
                      )
                    ) : (
                      <small className="text-muted">Rate</small>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-light btn-sm border"
                      onClick={() => openDetails(load)}
                    >
                      Details
                    </button>

                    {load.status === "assigned" && (
                      <button
                        className="btn btn-warning btn-sm text-white"
                        onClick={() => handlePickup(load._id)}
                      >
                        Start Trip
                      </button>
                    )}

                    {load.status === "in_transit" && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleReached(load._id)}
                      >
                        Reached
                      </button>
                    )}

                    {load.status === "reached_destination" && (
                      <button
                        className={`btn btn-sm ${
                          canComplete ? "btn-success" : "btn-secondary"
                        }`}
                        disabled={!canComplete}
                        onClick={() => handleComplete(load._id)}
                      >
                        {canComplete ? "Finish Job" : "Wait for Pay"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PanelWrapper>

      {selectedLoad && (
        <DriverLoadDetailsPanel load={selectedLoad} onClose={closeDetails} />
      )}
    </>
  );
}
