import React from "react";

export default function Feature() {
  const features = [
    {
      icon: "location_on",
      title: "Real-Time Visibility",
      desc: "See every truck on a live map with precise GPS tracking. Know exactly where your cargo is at any moment.",
    },
    {
      icon: "touch_app",
      title: "Instant Booking",
      desc: "No phone calls needed. Just click available loads on the map and confirm instantly. Efficiency redefined.",
    },
    {
      icon: "verified_user",
      title: "Guaranteed Payments",
      desc: "Secure transactions for every mile you drive or ship. Smart contracts ensure instant payout upon delivery.",
    },
  ];

  return (
    <div className="container py-5 mb-5">
      {/* HEADING */}
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ fontSize: "48px", lineHeight: "1.2" }}>
          The LoadMitrra Advantage
        </h1>
        <p className="text-muted mt-2" style={{ fontSize: "17px" }}>
          Experience a new standard in freight management.
          <br />
          Our visual-first platform removes the guesswork from logistics.
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className="row g-4">
        {features.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div
              className="p-4 border shadow-sm h-100"
              style={{
                borderRadius: "14px",
                background: "#F8FBFF",
              }}
            >
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "#EEF4FF",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "28px", color: "#3B82F6" }}
                >
                  {item.icon}
                </span>
              </div>

              <h4 className="fw-semibold">{item.title}</h4>
              <p className="text-muted mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
