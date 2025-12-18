import React from "react";
import { useNavigate } from "react-router-dom";
import truckMap from "../assets/truckmap.jpg";

function Hero() {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/auth/signup/driver");
  };

  return (
    <section className="py-5 position-relative" style={{ background: "#fff" }}>
      {/* dotted background pattern */}
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
          {/* ================= LEFT SIDE ================= */}
          <div className="col-lg-6">
            {/* Badge */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary-subtle text-primary fw-semibold mb-4"
              style={{ fontSize: "0.875rem" }}
            >
              <span
                className="rounded-circle bg-primary d-inline-block"
                style={{ width: "8px", height: "8px" }}
              ></span>
              For Professional Drivers
            </div>

            {/* Heading */}
            <h1
              className="fw-bolder display-4 text-dark mb-4"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              Drive More.
              <br />
              Earn More. <span className="text-primary">Stress Less.</span>
            </h1>

            {/* Description */}
            <p className="lead text-muted mb-5" style={{ maxWidth: "500px" }}>
              Join the LoadMitrra logistics network designed for drivers. Get
              transparent pricing, instant bookings, and routes that make sense
              for your schedule.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <button
                className="btn btn-primary btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                onClick={handleSignup} // This now calls the function above
              >
                Sign Up Now{" "}
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1.2rem" }}
                >
                  arrow_forward
                </span>
              </button>
              <button className="btn btn-outline-dark btn-lg px-4 py-3 fw-semibold d-flex align-items-center gap-2">
                View Available Loads
              </button>
            </div>

            {/* Trusted By */}
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-circle border border-2 border-white d-flex align-items-center justify-content-center bg-secondary-subtle text-secondary"
                    style={{
                      width: 44,
                      height: 44,
                      marginLeft: i > 0 ? -16 : 0,
                      zIndex: 3 - i,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "1.5rem" }}
                    >
                      person
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-0 text-muted">
                  Trusted by{" "}
                  <span className="fw-bold text-dark">5,000+ drivers</span>
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-5 overflow-hidden position-relative"
              style={{ minHeight: "500px" }}
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
              <div className="position-absolute inset-0 bg-primary opacity-10"></div>

              <div className="card-body position-relative p-4 d-flex flex-column justify-content-between h-100 z-1">
                {/* --- Top Cards Row --- */}
                <div className="d-flex gap-3 w-100">
                  {/* Earnings Card - Glass Effect */}
                  <div
                    className="card border-0 shadow-sm rounded-4 p-3 flex-fill"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)", // More transparent
                      backdropFilter: "blur(12px)", // Stronger blur
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Glass edge
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <div className="bg-success-subtle text-success rounded-circle p-2 d-flex">
                        <span className="material-symbols-outlined">paid</span>
                      </div>
                      <small className="text-dark fw-bold opacity-75">
                        Today's Earnings
                      </small>
                    </div>
                    <div className="fs-3 fw-bold text-dark">₹ 4,500.00</div>
                  </div>

                  {/* Next Load Card - Glass Effect */}
                  <div
                    className="card border-0 shadow-sm rounded-4 p-3 flex-fill"
                    style={{
                      background: "rgba(255, 255, 255, 0.6)", // More transparent
                      backdropFilter: "blur(12px)", // Stronger blur
                      border: "1px solid rgba(255, 255, 255, 0.3)", // Glass edge
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <div className="bg-primary-subtle text-primary rounded-circle p-2 d-flex">
                        <span className="material-symbols-outlined">
                          local_shipping
                        </span>
                      </div>
                      <small className="text-dark fw-bold opacity-75">
                        Next Load
                      </small>
                    </div>
                    <div className="fs-4 fw-bold text-dark">Mumbai → Pune</div>
                  </div>
                </div>

                {/* --- Bottom Alert Card - Glass Effect --- */}
                <div
                  className="card border-0 shadow rounded-4 p-1"
                  style={{
                    background: "rgba(255, 255, 255, 0.6)", // More transparent
                    backdropFilter: "blur(12px)", // Stronger blur
                    border: "1px solid rgba(255, 255, 255, 0.3)", // Glass edge
                  }}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined text-danger animate-pulse">
                          notifications_active
                        </span>
                        <small className="fw-bold text-uppercase text-dark opacity-75 ls-1">
                          New Load Alert
                        </small>
                      </div>
                      <span className="badge bg-white text-primary shadow-sm rounded-pill px-3">
                        Just Now
                      </span>
                    </div>

                    {/* Inner Route Box - Removed bg-light, added semi-transparent bg */}
                    <div
                      className="d-flex justify-content-between align-items-center p-3 rounded-4 border-start border-4 border-primary"
                      style={{ background: "rgba(255, 255, 255, 0.5)" }}
                    >
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-primary">
                            near_me
                          </span>
                          <h5 className="fw-bold mb-0">
                            Delhi <span className="text-muted mx-1">→</span>{" "}
                            Jaipur
                          </h5>
                        </div>
                        <div className="d-flex align-items-center gap-3 text-dark opacity-75 small">
                          <span>
                            <span className="material-symbols-outlined fs-6 align-middle me-1">
                              straighten
                            </span>{" "}
                            280 km
                          </span>
                          <span>
                            <span className="material-symbols-outlined fs-6 align-middle me-1">
                              inventory_2
                            </span>{" "}
                            7 Ton Truck
                          </span>
                        </div>
                      </div>
                      <button className="btn btn-primary fw-semibold px-4 py-2 d-flex align-items-center gap-2 shadow-sm">
                        Accept{" "}
                        <span className="material-symbols-outlined fs-5">
                          check
                        </span>
                      </button>
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
