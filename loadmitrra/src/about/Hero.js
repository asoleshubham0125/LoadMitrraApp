import React from "react";
import warehouseImg from "../assets/warehouseAndTruck.png";
import FeatureCard from "./FeatureCard";
function Hero() {
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <div
              className="position-relative"
              style={{
                maxWidth: "95%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-8px",
                  background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                  borderRadius: "18px",
                  filter: "blur(18px)",
                  opacity: 0.25,
                  zIndex: 0,
                  transition: "opacity 0.4s ease",
                }}
                className="glow-bg"
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: "18px",
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                  background: "#fff",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  zIndex: 1,
                }}
              >
                <img
                  src={warehouseImg}
                  alt="Logistics warehouse and truck"
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="success-float d-flex align-items-center gap-3">
                <div className="icon-wrap">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                </div>
                <div>
                  <p className="label">Success Rate</p>
                  <p className="value">99.8%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <span
              className="badge rounded-pill mb-3"
              style={{
                background: "rgba(37, 99, 235, 0.1)",
                color: "#2563eb",
                fontSize: "12px",
                letterSpacing: "1px",
                fontWeight: "700",
                padding: "6px 12px",
                width: "fit-content",
              }}
            >
              ABOUT US
            </span>
            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "42px", lineHeight: "1.2" }}
            >
              Revolutionizing <br />
              Logistics with <br />
              <span style={{ color: "#2563EB" }}>LoadMitrra</span>
            </h1>
            <p
              className="text-muted mb-4"
              style={{ fontSize: "16px", lineHeight: "1.7", maxWidth: "520px" }}
            >
              Bridging the gap between suppliers and drivers with transparency
              and speed. We connect you to the right load, right now, ensuring a
              seamless journey from pickup to delivery. Our technology
              simplifies the complex world of freight.
            </p>
            <div className="row g-3 mt-4">
              <FeatureCard
                title="Real-time Tracking"
                desc="Monitor your cargo 24/7 anywhere."
                bg="#EAF1FF"
                icon="location_on"
                color="#2563EB"
              />

              <FeatureCard
                title="Verified Drivers"
                desc="Trusted professionals for every load."
                bg="#F3E8FF"
                icon="verified"
                color="#7C3AED"
              />

              <FeatureCard
                title="Secure Payments"
                desc="Fast and guaranteed transactions."
                bg="#DCFCE7"
                icon="payments"
                color="#16A34A"
              />

              <FeatureCard
                title="Instant Matching"
                desc="AI-driven load finding in seconds."
                bg="#FFEDD5"
                icon="bolt"
                color="#EA580C"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
