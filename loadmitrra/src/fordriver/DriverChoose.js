import React from "react";

function DriverChoose() {
  const features = [
    {
      title: "Instant Payments",
      desc: "No more waiting 30, 60, or 90 days. Get paid within 24 hours of delivery confirmation directly to your account.",
      icon: "payments",
      color: "#3b82f6", // Blue
      bg: "#eff6ff", // Light Blue
    },
    {
      title: "Visual Load Board",
      desc: "See loads on a map, not a list. Optimize your route visually to pick up backhauls and minimize empty miles.",
      icon: "map",
      color: "#f59e0b", // Orange
      bg: "#fffbeb", // Light Orange
    },
    {
      title: "Verified Suppliers",
      desc: "Work with trusted shippers. We vet every supplier so you can book with confidence and avoid payment disputes.",
      icon: "verified",
      color: "#10b981", // Green
      bg: "#ecfdf5", // Light Green
    },
    {
      title: "Mobile First App",
      desc: "Manage your entire business from your phone. Scan documents, chat with shippers, and book loads on the go.",
      icon: "smartphone",
      color: "#a855f7", // Purple
      bg: "#faf5ff", // Light Purple
    },
    {
      title: "24/7 Driver Support",
      desc: "Real humans, round the clock. Whether you're stuck at a dock or have an app issue, we're here to help.",
      icon: "support_agent",
      color: "#ef4444", // Red
      bg: "#fef2f2", // Light Red
    },
    {
      title: "Performance Insights",
      desc: "Track your earnings and efficiency. Our dashboard gives you the data you need to grow your trucking business.",
      icon: "bar_chart", // or 'insights'
      color: "#0ea5e9", // Cyan/Teal
      bg: "#f0f9ff", // Light Cyan
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        {/* ===== Heading ===== */}
        <div className="text-center mb-5">
          <h2 className="fw-bolder display-5 mb-3">
            Why Drivers Choose LoadMitrra
          </h2>
          <p
            className="text-secondary mx-auto fs-5"
            style={{ maxWidth: "700px", lineHeight: "1.6" }}
          >
            We've stripped away the complexity. Our platform is built to keep
            your wheels turning and your pockets full.
          </p>
        </div>

        {/* ===== Cards Grid ===== */}
        <div className="row g-4">
          {features.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className="card border-0 h-100 p-4 rounded-4"
                style={{ backgroundColor: "#f8f9fa" }} // Matches the light grey card background
              >
                <div className="card-body p-0">
                  {/* Icon Box */}
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
                    style={{
                      width: "56px",
                      height: "56px",
                      backgroundColor: item.bg,
                      color: item.color,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "28px" }}
                    >
                      {item.icon}
                    </span>
                  </div>

                  {/* Text Content */}
                  <h4 className="fw-bold mb-3" style={{ fontSize: "1.25rem" }}>
                    {item.title}
                  </h4>
                  <p
                    className="text-muted mb-0"
                    style={{ lineHeight: "1.7", fontSize: "0.95rem" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DriverChoose;
