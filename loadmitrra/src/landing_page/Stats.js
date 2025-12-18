import React from "react";

export default function Stats() {
  return (
    <div className="container py-5">
      <div className="row text-center g-4">
        <div className="col-md-4">
          <div
            className="p-4 border shadow-sm"
            style={{ borderRadius: "14px", background: "#F8FBFF" }}
          >
            <h2 className="fw-bold" style={{ color: "#007BFF" }}>
              500+
            </h2>
            <p className="mb-0 text-secondary">Loads Delivered Successfully</p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 border shadow-sm"
            style={{ borderRadius: "14px", background: "#FFF7F0" }}
          >
            <h2 className="fw-bold" style={{ color: "#FF7A00" }}>
              1200+
            </h2>
            <p className="mb-0 text-secondary">Active Drivers on LoadMitrra</p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 border shadow-sm"
            style={{ borderRadius: "14px", background: "#F1FFF5" }}
          >
            <h2 className="fw-bold" style={{ color: "#28A745" }}>
              99%
            </h2>
            <p className="mb-0 text-secondary">Partner Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
