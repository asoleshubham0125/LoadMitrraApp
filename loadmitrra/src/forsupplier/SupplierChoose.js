import React from "react";

export default function SupplierChoose() {
  const features = [
    {
      icon: "hub",
      title: "Expansive Driver Network",
      desc: "Access thousands of verified trucks ready to move your freight. From dry vans to flatbeds, find the right equipment instantly.",
      color: "#0d6efd", // Blue
      bgColor: "rgba(13, 110, 253, 0.1)",
    },
    {
      icon: "location_on",
      title: "Real-Time Visibility",
      desc: "Never wonder where your cargo is. Track shipments live on our interactive map and share status links with your customers.",
      color: "#ffc107", // Yellow/Orange
      bgColor: "rgba(255, 193, 7, 0.1)",
    },
    {
      icon: "verified_user", // Changed to shield icon
      title: "Vetted & Insured",
      desc: "Security comes first. Every driver is rigorously vetted for authority, insurance, and safety ratings before they can book your load.",
      color: "#198754", // Green
      bgColor: "rgba(25, 135, 84, 0.1)",
    },
    {
      icon: "description",
      title: "Digital Documentation",
      desc: "Say goodbye to lost paperwork. BOLs, PODs, and invoices are digitized and stored securely in your dashboard for easy auditing.",
      color: "#6f42c1", // Purple
      bgColor: "rgba(111, 66, 193, 0.1)",
    },
    {
      icon: "auto_awesome", // Changed to sparkles/stars icon
      title: "Smart Matching",
      desc: "Our algorithm matches your freight with the best-positioned drivers, reducing empty miles and lowering your shipping costs.",
      color: "#0dcaf0", // Cyan/Teal
      bgColor: "rgba(13, 202, 240, 0.1)",
    },
    {
      icon: "support_agent",
      title: "Dedicated Support",
      desc: "Logistics never sleeps, and neither do we. Our operations team is available 24/7 to resolve exceptions and keep freight moving.",
      color: "#dc3545", // Red
      bgColor: "rgba(220, 53, 69, 0.1)",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-5 mx-auto" style={{ maxWidth: "700px" }}>
          <h2 className="fw-bold display-6 mb-3">
            Why Suppliers Choose LoadMitrra
          </h2>
          <p className="text-muted lead fs-6">
            Streamline your operations with tools designed for modern logistics.
            We bring clarity and efficiency to your freight movement.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="row g-4">
          {features.map((item, index) => (
            <div key={index} className="col-md-6">
              <div className="p-4 rounded-4 bg-light h-100 border-0">
                <div className="d-flex align-items-start gap-3">
                  {/* Icon Box */}
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: item.bgColor,
                      color: item.color,
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "1.75rem" }}
                    >
                      {item.icon}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h5 className="fw-bold mb-2">{item.title}</h5>
                    <p className="text-muted small mb-0 lh-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
