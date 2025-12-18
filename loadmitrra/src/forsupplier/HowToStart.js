import React from "react";
import { useNavigate } from "react-router-dom";

export default function HowToStart() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/auth/signup/supplier");
  };

  // Common style for the vertical line container
  const dividerStyle = {
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    width: "1px",
    backgroundColor: "#dae3f3", // Light blue-ish gray divider
  };

  // Base style for the dots
  const dotStyle = {
    position: "absolute",
    left: "-3.5px", // Center the 8px dot on the 1px line
    top: "6px", // Align visually with the top of the text
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div
          className="rounded-4 p-5"
          style={{
            backgroundColor: "#f8fbff", // Very light blue background
            border: "1px solid #edf2fc",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          }}
        >
          <div className="row g-5">
            {/* ================= LEFT CONTENT ================= */}
            <div className="col-lg-4 d-flex flex-column justify-content-center">
              <h3 className="fw-bolder mb-3 text-dark">Start Shipping Today</h3>

              <p
                className="text-muted mb-4"
                style={{ lineHeight: "1.6", fontSize: "0.95rem" }}
              >
                Join the fastest growing logistics network. It takes less than 5
                minutes to set up your account and post your first load.
              </p>

              <div>
                <button
                  className="btn px-4 py-2 fw-semibold shadow-sm border-0"
                  onClick={handleSignup}
                  style={{
                    backgroundColor: "#0d6efd", // Exact orange from image
                    color: "#fff",
                  }}
                >
                  Create Supplier Account
                </button>
              </div>
            </div>

            {/* ================= RIGHT STEPS ================= */}
            <div className="col-lg-8">
              <div className="row h-100 g-4">
                {/* STEP 1 */}
                <div className="col-md-4 position-relative">
                  {/* Divider Line */}
                  <div className="d-none d-md-block" style={dividerStyle}>
                    {/* Blue Dot */}
                    <div style={{ ...dotStyle, backgroundColor: "#0d6efd" }} />
                  </div>

                  <div className="ps-md-4">
                    <h6 className="fw-bold mb-2 text-dark">1. Register</h6>
                    <p className="text-muted small mb-0 lh-sm">
                      Sign up with your business details and verify your email.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="col-md-4 position-relative">
                  {/* Divider Line */}
                  <div className="d-none d-md-block" style={dividerStyle}>
                    {/* Orange Dot */}
                    <div style={{ ...dotStyle, backgroundColor: "#f27430" }} />
                  </div>

                  <div className="ps-md-4">
                    <h6 className="fw-bold mb-2 text-dark">2. Post a Load</h6>
                    <p className="text-muted small mb-0 lh-sm">
                      Enter pickup and delivery details. Get instant quotes.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="col-md-4 position-relative">
                  {/* Divider Line */}
                  <div className="d-none d-md-block" style={dividerStyle}>
                    {/* Blue Dot */}
                    <div style={{ ...dotStyle, backgroundColor: "#0d6efd" }} />
                  </div>

                  <div className="ps-md-4">
                    <h6 className="fw-bold mb-2 text-dark">3. Track & Relax</h6>
                    <p className="text-muted small mb-0 lh-sm">
                      Watch your cargo move in real-time and receive digital
                      PODs.
                    </p>
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
