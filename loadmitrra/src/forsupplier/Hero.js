import React from "react";
import { useNavigate } from "react-router-dom";
import truckMap from "../assets/truckmap.jpg"; // Ensure this is a dark/night map for best effect

function Hero() {
  const navigate = useNavigate();

  const handlePostLoad = () => {
    navigate("/auth/signup/supplier");
  };

  return (
    <section className="py-5 position-relative" style={{ background: "#fff" }}>
      {/* Dotted background pattern (same as your reference) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div className="container position-relative z-1">
        <div className="row align-items-center g-5 py-5">
          {/* ================= LEFT SIDE (Content) ================= */}
          <div className="col-lg-6">
            {/* Badge - Suppliers */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary-subtle text-primary fw-semibold mb-4"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className="rounded-circle bg-primary d-inline-block"
                style={{ width: "8px", height: "8px" }}
              ></span>
              For Suppliers & Agents
            </div>

            {/* Heading */}
            <h1
              className="fw-bolder display-4 text-dark mb-4"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              Ship Smarter.
              <br />
              Scale Faster. <br />
              <span className="text-primary">Reliably.</span>
            </h1>

            {/* Description */}
            <p className="lead text-muted mb-5" style={{ maxWidth: "500px" }}>
              Connect with a verified network of professional drivers. Get
              real-time tracking, digital proof of delivery, and instant load
              booking to keep your supply chain moving.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <button
                className="btn btn-primary btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                onClick={handlePostLoad}
              >
                Post a Load Now
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1.2rem" }}
                >
                  arrow_forward
                </span>
              </button>
              <button className="btn btn-outline-dark btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2">
                View Verified Drivers
              </button>
            </div>

            {/* Trusted By */}
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    // Gradient background to mimic user avatars
                    className="rounded-circle border border-2 border-white d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: 44,
                      height: 44,
                      marginLeft: i > 0 ? -16 : 0,
                      zIndex: 3 - i,
                      background: `linear-gradient(135deg, #6c757d, #adb5bd)`,
                    }}
                  >
                    {/* Placeholder icon if no image */}
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "1.2rem" }}
                    >
                      person
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-0 text-muted">
                  Trusted by{" "}
                  <span className="fw-bold text-dark">2,000+ shippers</span>
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Dashboard Mockup) ================= */}
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-5 overflow-hidden position-relative"
              style={{ minHeight: "450px" }}
            >
              {/* Map Background Image */}
              <div
                className="position-absolute inset-0 w-100 h-100"
                style={{
                  backgroundImage: `url(${truckMap})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Grid Lines Overlay (Optional purely specifically for that 'tech' look) */}
              <div
                className="position-absolute w-100 h-100"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                  pointerEvents: "none",
                }}
              ></div>

              <div className="card-body position-relative p-4 d-flex flex-column justify-content-between h-100 z-1">
                {/* --- Top Row: Stats Cards --- */}
                <div className="d-flex gap-3 w-100">
                  {/* Card 1: Active Shipments */}
                  <div
                    className="card border-0 shadow rounded-4 p-3 flex-fill"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)", // More transparent
                      backdropFilter: "blur(12px)", // Stronger blur
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Glass edge
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="bg-warning bg-opacity-25 text-warning rounded-circle p-2 d-flex justify-content-center align-items-center"
                        style={{ width: 45, height: 45 }}
                      >
                        <span className="material-symbols-outlined">
                          inventory_2
                        </span>
                      </div>
                      <div>
                        <small
                          className="text-muted fw-bold d-block"
                          style={{ fontSize: "0.75rem" }}
                        >
                          Active Shipments
                        </small>
                        <div className="fs-5 fw-bolder text-dark">12 Loads</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: On-Time Rate */}
                  <div
                    className="card border-0 shadow rounded-4 p-3 flex-fill"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)", // More transparent
                      backdropFilter: "blur(12px)", // Stronger blur
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Glass edge
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="bg-primary bg-opacity-25 text-primary rounded-circle p-2 d-flex justify-content-center align-items-center"
                        style={{ width: 45, height: 45 }}
                      >
                        <span className="material-symbols-outlined">
                          trending_up
                        </span>
                      </div>
                      <div>
                        <small
                          className="text-muted fw-bold d-block"
                          style={{ fontSize: "0.75rem" }}
                        >
                          On-Time Rate
                        </small>
                        <div className="fs-5 fw-bolder text-dark">99.2%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Bottom Row: Notification Card --- */}
                <div className="mt-auto">
                  <div
                    className="card border-0 shadow rounded-4 p-0 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)", // More transparent
                      backdropFilter: "blur(12px)", // Stronger blur
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Glass edge
                    }}
                  >
                    <div className="card-body p-3">
                      {/* Header */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-success rounded-circle p-1">
                            {" "}
                          </span>
                          <small
                            className="fw-bold text-success text-uppercase"
                            style={{
                              fontSize: "0.7rem",
                              letterSpacing: "0.5px",
                            }}
                          >
                            Shipment Delivered
                          </small>
                        </div>
                        <small
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          2 mins ago
                        </small>
                      </div>

                      {/* Details */}
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold text-dark mb-0">
                            Order #LM-8922
                          </h6>
                          <div className="text-muted small mt-1">
                            Pune <span className="mx-1">→</span> Mumbai • Signed
                            by Amit Singh
                          </div>
                        </div>
                        <div className="text-secondary opacity-50">
                          <span className="material-symbols-outlined fs-3">
                            check_circle
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
