import { useEffect, useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { getAvailableLoads, acceptLoad } from "../services/driverApi";
import { useDriverMap } from "../context/DriverMapContext";

export default function LoadsPanel() {
  const { setRoute } = useDriverMap();

  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);

  /* 🔄 FETCH AVAILABLE LOADS */
  useEffect(() => {
    let mounted = true;

    const fetchLoads = async () => {
      try {
        setLoading(true);
        const res = await getAvailableLoads();
        if (mounted) setLoads(res.data);
      } catch (err) {
        console.error("Failed to fetch loads", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLoads();
    const interval = setInterval(fetchLoads, 7000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /* ✅ ACCEPT LOAD (JWT SAFE) */
  const handleAcceptLoad = async (load) => {
    try {
      setAcceptingId(load._id);

      // Optional: show route preview on map
      setRoute({ from: load.from, to: load.to });

      await acceptLoad(load._id, new Date().toISOString());

      // Remove accepted load from UI
      setLoads((prev) => prev.filter((l) => l._id !== load._id));
    } catch (err) {
      console.error("Failed to accept load", err);
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <PanelWrapper title="Nearby Loads" count={loads.length}>
      {/* SEARCH */}
      <div style={{ padding: "16px" }}>
        <input
          type="text"
          placeholder="Search destination, ID..."
          className="form-control"
        />

        {/* FILTERS (UI only for now) */}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-outline-secondary btn-sm">Price</button>
          <button className="btn btn-outline-secondary btn-sm">Weight</button>
          <button className="btn btn-outline-secondary btn-sm">
            Equipment
          </button>
        </div>
      </div>

      {/* LOAD CARDS */}
      <div className="px-3">
        {loading && <p className="text-muted">Loading loads…</p>}

        {!loading && loads.length === 0 && (
          <p className="text-muted">No nearby loads available</p>
        )}

        {loads.map((load) => (
          <div
            key={load._id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "14px",
              marginBottom: "14px",
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

            {/* META */}
            <div className="text-muted small mt-1">
              {load.vehicle.category} · {load.vehicle.bodyType} · {load.weight}
              kg
            </div>

            {/* TIME WINDOW */}
            {load.pickupTimeWindow && (
              <div className="text-muted mt-2 d-flex align-items-center gap-1">
                <span className="material-symbols-outlined">timer</span>
                <span>
                  {new Date(load.pickupTimeWindow.start).toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}{" "}
                  –{" "}
                  {new Date(load.pickupTimeWindow.end).toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
            )}

            {/* PRICE + ACTION */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="fw-bold text-warning">₹{load.price}</div>

              <button
                className="btn btn-primary btn-sm"
                disabled={acceptingId === load._id}
                onClick={() => handleAcceptLoad(load)}
              >
                {acceptingId === load._id ? "Accepting…" : "Accept Load"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
}
