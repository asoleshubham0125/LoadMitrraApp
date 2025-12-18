import React from "react";
import mapVideo from "../assets/Truck_Movement.mp4";

export default function Hero() {
  return (
    <section className="container py-5 mb-5 mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <span
            className="badge rounded-pill"
            style={{
              background: "#E7F3FF",
              color: "#2B6EFF",
              padding: "10px 15px",
              fontSize: "14px",
            }}
          >
            <i className="fa-regular fa-map" style={{ marginRight: "6px" }}></i>
            LoadMitrra Logistics
          </span>

          <h1
            className="mt-3 fw-bold"
            style={{ fontSize: "48px", lineHeight: "1.2" }}
          >
            Logistics Simplified. <br />
            <span style={{ color: "#2B6EFF" }}>LoadMitrra-First.</span>
          </h1>

          <p className="text-secondary mt-3" style={{ fontSize: "17px" }}>
            Connect directly with suppliers or find your next load instantly on
            our visual platform. The smartest, most transparent way to move
            freight.
          </p>

          <div className="d-flex mt-4 gap-3">
            <button
              className="btn btn-primary px-4 py-2"
              style={{
                fontSize: "16px",
                backgroundColor: "#2B6EFF",
                borderColor: "#2B6EFF",
              }}
            >
              I am a Supplier <i class="fa-solid fa-arrow-right"></i>
            </button>

            <button
              className="btn btn-outline-secondary px-4 py-2"
              style={{ fontSize: "16px" }}
            >
              I am a Driver <i className="fa-regular fa-truck"></i>
            </button>
          </div>

          <div className="mt-4 text-success d-flex align-items-center gap-2">
            <span style={{ fontSize: "20px" }}>✔</span>
            <span>Free to get started. No credit card required.</span>
          </div>
        </div>

        <div className="col-md-6 mt-5 mt-md-0">
          <div
            className="shadow rounded-4"
            style={{
              backgroundColor: "#000",
              borderRadius: "20px",
              overflow: "hidden",
              height: "360px",
              position: "relative",
            }}
          >
            <video
              src={mapVideo}
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                borderRadius: "20px",
                opacity: 0.95,
              }}
              autoPlay
              loop
              muted
              playsInline
            />

            <div
              className="shadow p-3 rounded-3 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#ffffff",
                position: "absolute",
                bottom: "15px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
              }}
            >
              <div>
                <strong>Active Shipment #2049</strong>
                <div className="text-secondary" style={{ fontSize: "14px" }}>
                  Delhi → Mumbai • 30h 30min remaining
                </div>
              </div>

              <div className="text-success fw-bold">On Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
