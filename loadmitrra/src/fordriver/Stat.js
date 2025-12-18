import React from "react";

function Stat() {
  const stats = [
    {
      icon: "schedule",
      value: "24h",
      label: "Payment Turnaround",
    },
    {
      icon: "money_off", // Represents 0% fees
      value: "0%",
      label: "Hidden Fees",
    },
    {
      icon: "local_shipping",
      value: "15k+",
      label: "Loads Available",
    },
    {
      icon: "star",
      value: "4.9",
      label: "Driver Rating",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#f9fafb", // Matches the light gray in image
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center">
                {/* Google Icon */}
                <span
                  className="material-symbols-outlined text-primary mb-2"
                  style={{ fontSize: "2rem" }}
                >
                  {stat.icon}
                </span>

                {/* Number Value */}
                <div
                  className="fw-bolder text-primary lh-1 mb-1"
                  style={{ fontSize: "2.5rem" }}
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

export default Stat;
