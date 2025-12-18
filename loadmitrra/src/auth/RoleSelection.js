import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LoadMitrra.png";

function RoleSelection() {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center mb-4">
          <img
            src={logo}
            alt="LoadMitrra Logo"
            style={{
              width: "140px",
              objectFit: "contain",
            }}
          />

          <div>
            <span
              style={{
                fontWeight: "800",
                fontSize: "3rem",
                color: "#4682b4",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Load
            </span>
            <span
              style={{
                fontWeight: "800",
                fontSize: "3rem",
                color: "#123456",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Mitrra
            </span>
          </div>

          <div className="mt-3">
            <h1
              style={{
                fontWeight: "800",
                fontSize: "3.5rem",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "1.2",
              }}
            >
              Get Started with LoadMitrra
            </h1>

            <p className="text-muted fs-5 mt-1">
              <i>Choose your role to continue</i>
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div
              className="h-100 shadow-sm position-relative overflow-hidden p-4"
              style={{
                borderRadius: "20px",
                background: "#ffffff",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "#EAF1FF",
                  color: "#1E5EFF",
                }}
              >
                <span className="material-symbols-outlined fs-3">
                  local_shipping
                </span>
              </div>

              <h4 className="fw-bold mb-2">Driver</h4>

              <div
                style={{
                  width: "32px",
                  height: "4px",
                  background: "#1E5EFF",
                  borderRadius: "4px",
                  marginBottom: "20px",
                }}
              />

              <ul className="list-unstyled text-muted">
                <li className="mb-3 d-flex align-items-center">
                  <span className="material-symbols-outlined text-primary me-2">
                    check_circle
                  </span>
                  Find loads instantly
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="material-symbols-outlined text-primary me-2">
                    check_circle
                  </span>
                  Earn faster payments
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="material-symbols-outlined text-primary me-2">
                    check_circle
                  </span>
                  Zero commission*
                </li>
              </ul>

              <button
                className="btn w-100 mt-3"
                style={{
                  background: "#1E5EFF",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "14px",
                  fontWeight: "600",
                }}
                onClick={() => navigate("/auth/signup/driver")}
              >
                Continue as Driver →
              </button>

              <span
                className="material-symbols-outlined"
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "180px",
                  color: "#1E5EFF",
                  opacity: "0.05",
                  pointerEvents: "none",
                }}
              >
                map
              </span>
            </div>
          </div>

          <div className="col-md-5">
            <div
              className="p-4 h-100 shadow-sm position-relative overflow-hidden"
              style={{
                borderRadius: "20px",
                background: "#ffffff",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "#FFF1E6",
                  color: "#F97316",
                }}
              >
                <span className="material-symbols-outlined fs-3">factory</span>
              </div>

              <h4 className="fw-bold mb-2">Supplier / Agent</h4>

              <div
                style={{
                  width: "32px",
                  height: "4px",
                  background: "#F97316",
                  borderRadius: "4px",
                  marginBottom: "20px",
                }}
              />

              <ul className="list-unstyled text-muted">
                <li className="mb-3 d-flex align-items-center">
                  <span
                    className="material-symbols-outlined me-2"
                    style={{ color: "#F97316" }}
                  >
                    check_circle
                  </span>
                  Post loads easily
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span
                    className="material-symbols-outlined me-2"
                    style={{ color: "#F97316" }}
                  >
                    check_circle
                  </span>
                  Track trucks live
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span
                    className="material-symbols-outlined me-2"
                    style={{ color: "#F97316" }}
                  >
                    check_circle
                  </span>
                  Grow business
                </li>
              </ul>

              <button
                className="btn w-100 mt-3"
                style={{
                  background: "#111827",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "14px",
                  fontWeight: "600",
                }}
                onClick={() => navigate("/auth/signup/supplier")}
              >
                Continue as Supplier →
              </button>

              <span
                className="material-symbols-outlined"
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "180px",
                  color: "#F97316",
                  opacity: "0.06",
                  pointerEvents: "none",
                }}
              >
                factory
              </span>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="col text-center mt-4">
          <p className="text-muted mt-4 fs-5">
            Already have an account?{" "}
            <a
              href="/auth/login"
              style={{
                color: "#1E5EFF",
                fontWeight: "600",
              }}
            >
              Login
            </a>
          </p>
          <p className="text-muted fs-6">
            By continuing, you agree to LoadMitrra's{" "}
            <u>Terms of Services & Privacy Poilcy</u>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
