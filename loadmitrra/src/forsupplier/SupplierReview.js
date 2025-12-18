import React, { useEffect, useState } from "react";

const reviews = [
  {
    quote:
      "We used to spend hours calling brokers and chasing down drivers for updates. With LoadMitrra, I post a load and it’s booked within minutes. The real-time tracking has completely transformed our customer service capabilities.",
    name: "Sarah Jenkins",
    role: "Logistics Director, TechFlow Inc.",
    stats: {
      admin: "40%",
      delivery: "99%",
      cost: "15%",
      pod: "24h",
    },
  },
  {
    quote:
      "LoadMitrra gives us complete visibility across shipments. The digital documentation and instant driver matching save our team massive time every day.",
    name: "Ankit Verma",
    role: "Supply Chain Manager, NovaLogix",
    stats: {
      admin: "35%",
      delivery: "98%",
      cost: "18%",
      pod: "20h",
    },
  },
  {
    quote:
      "From booking to POD, everything is seamless. Our operations are smoother and customers are happier.",
    name: "Priya Nair",
    role: "Operations Head, BlueRoute",
    stats: {
      admin: "42%",
      delivery: "99%",
      cost: "20%",
      pod: "18h",
    },
  },
];

export default function SupplierReview() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (paused) return;

    // Changed to 3000ms (3 seconds) per your request
    const id = setInterval(
      () => setIndex((i) => (i + 1) % reviews.length),
      3000
    );
    return () => clearInterval(id);
  }, [paused]);

  const review = reviews[index];

  return (
    <section
      className="py-5 position-relative"
      style={{ backgroundColor: "#F5F7FA" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Inline style for simple fade animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="container py-4">
        <div className="row align-items-center g-5">
          {/* LEFT CONTENT */}
          {/* Added key={index} so this section re-renders with animation on change */}
          <div className="col-lg-6 animate-fade" key={`content-${index}`}>
            <span className="text-uppercase fw-bold small text-warning">
              Success Stories
            </span>

            <h2 className="fw-bold mt-2 mb-3">
              "Reliability we can count on."
            </h2>

            <p
              className="fst-italic text-muted fs-5 mb-4"
              style={{ minHeight: "120px" }}
            >
              {review.quote}
            </p>

            <div className="d-flex align-items-center gap-3 mt-4">
              <span className="material-symbols-outlined text-primary fs-3">
                business_center
              </span>
              <div>
                <div className="fw-bold">{review.name}</div>
                <div className="text-muted small">{review.role}</div>
              </div>
            </div>

            {/* Dots */}
            <div className="d-flex gap-2 mt-4">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  style={{
                    width: i === index ? 36 : 12,
                    height: 6,
                    background: i === index ? "#0d6efd" : "#dee2e6",
                    borderRadius: 6,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT STATS */}
          {/* Added key={index} here as well for animation */}
          <div className="col-lg-6 animate-fade" key={`stats-${index}`}>
            <div className="row g-4">
              <div className="col-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <h2 className="fw-bold text-primary mb-1">
                    {review.stats.admin}
                  </h2>
                  <p className="text-muted small mb-0">Admin Time Saved</p>
                </div>
              </div>

              <div className="col-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <h2 className="fw-bold text-warning mb-1">
                    {review.stats.delivery}
                  </h2>
                  <p className="text-muted small mb-0">On-Time Deliveries</p>
                </div>
              </div>

              <div className="col-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <h2 className="fw-bold text-primary mb-1">
                    {review.stats.cost}
                  </h2>
                  <p className="text-muted small mb-0">Shipping Cost Reduced</p>
                </div>
              </div>

              <div className="col-6">
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <h2 className="fw-bold text-warning mb-1">
                    {review.stats.pod}
                  </h2>
                  <p className="text-muted small mb-0">Digital POD Turnover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
