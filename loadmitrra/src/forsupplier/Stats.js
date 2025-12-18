import React from "react";

function Stats() {
  const stats = [
    {
      value: "5k+",
      label: "Verified Drivers",
      color: "#0d6efd", // Bootstrap Primary Blue
    },
    {
      value: "20%",
      label: "Avg. Cost Reduction",
      color: "#fd7e14", // Bootstrap Orange
    },
    {
      value: "Live",
      label: "GPS Tracking",
      color: "#0d6efd", // Blue
    },
    {
      value: "24/7",
      label: "Support Team",
      color: "#fd7e14", // Orange
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#f9fafb", // Matches the light gray background
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center">
                {/* Number Value - No Icon, just large text */}
                <div
                  className="fw-bolder mb-2"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: "1",
                    color: stat.color, // Applies the specific blue or orange
                  }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div
                  className="text-secondary fw-semibold"
                  style={{ fontSize: "0.9rem" }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
