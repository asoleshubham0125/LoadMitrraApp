import React from "react";
import { useNavigate } from "react-router-dom";

function HowToStart() {
  // Custom style for the blue dot on the divider line
  const dotStyle = {
    position: "absolute",
    left: "-4px", // Centers the 7px dot on the 1px border
    top: "0",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#0d6efd", // Bootstrap primary blue
  };

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/auth/signup/driver");
  };
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div
          className="rounded-4 p-5"
          style={{
            backgroundColor: "#f2f7ff",
            border: "1px solid #e1e9f8",
          }}
        >
          <div className="row g-5">
            {/* ================= LEFT CONTENT ================= */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h2 className="fw-bolder mb-3 text-dark">How to Get Started</h2>
              <p
                className="text-secondary mb-4"
                style={{ lineHeight: "1.6", fontSize: "0.95rem" }}
              >
                Joining LoadMitrra is simple. We just need to verify your
                credentials to ensure the safety and quality of our network.
              </p>

              <button
                className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
                onClick={handleSignup}
              >
                Start Application
              </button>
            </div>

            {/* ================= STEPS CONTAINER ================= */}
            <div className="col-lg-8">
              <div className="row h-100 g-4">
                {/* STEP 1 */}
                <div className="col-md-4 position-relative">
                  {/* Vertical Divider (Left side) */}
                  <div
                    className="d-none d-md-block position-absolute"
                    style={{
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      backgroundColor: "#cad9f5", // Light blue line color
                    }}
                  >
                    {/* The Blue Dot */}
                    <div style={dotStyle}></div>
                  </div>

                  {/* Content (Padded to clear the line) */}
                  <div className="ps-md-4">
                    <h6 className="fw-bold mb-2 text-dark">1. Sign Up</h6>
                    <p
                      className="text-muted small mb-0"
                      style={{ lineHeight: "1.5" }}
                    >
                      Create your account and upload your CDL and insurance
                      documents.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="col-md-4 position-relative">
                  {/* Vertical Divider */}
                  <div
                    className="d-none d-md-block position-absolute"
                    style={{
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      backgroundColor: "#cad9f5",
                    }}
                  >
                    <div style={dotStyle}></div>
                  </div>

                  <div className="ps-md-4">
                    <h6 className="fw-bold mb-2 text-dark">2. Get Verified</h6>
                    <p
                      className="text-muted small mb-0"
                      style={{ lineHeight: "1.5" }}
                    >
                      Our team reviews your docs within 24 hours. You'll be
                      notified via email.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="col-md-4 position-relative">
                  {/* Vertical Divider */}
                  <div
                    className="d-none d-md-block position-absolute"
                    style={{
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "1px",
                      backgroundColor: "#cad9f5",
                    }}
                  >
                    <div style={dotStyle}></div>
                  </div>

                  <div className="ps-md-4">
                    <h6 className="fw-bold mb-2 text-dark">3. Book Loads</h6>
                    <p
                      className="text-muted small mb-0"
                      style={{ lineHeight: "1.5" }}
                    >
                      Access the map, view loads, and start booking instantly.
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

export default HowToStart;
