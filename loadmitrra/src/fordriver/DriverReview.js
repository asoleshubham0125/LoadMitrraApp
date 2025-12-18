import React, { useEffect, useState } from "react";

const reviews = [
  {
    quote:
      "Earlier I used to wait days for brokers to respond. With LoadMitrra, I find loads instantly on the map and payments are super fast.",
    name: "Ramesh Patil",
    role: "Owner-Operator, Maharashtra",
    stats: {
      income: "28%",
      time: "2hrs",
      guarantee: "100%",
      support: "24/7",
    },
  },
  {
    quote:
      "The visual load board is a game changer. I always get a return load and my empty miles are almost zero now.",
    name: "Suresh Naidu",
    role: "Fleet Driver, Andhra Pradesh",
    stats: {
      income: "32%",
      time: "1.5hrs",
      guarantee: "100%",
      support: "24/7",
    },
  },
  {
    quote:
      "LoadMitrra helped me grow my earnings without stress. Support team is always available and payments are reliable.",
    name: "Amit Singh",
    role: "Long Haul Driver, Uttar Pradesh",
    stats: {
      income: "35%",
      time: "1hr",
      guarantee: "100%",
      support: "24/7",
    },
  },
];

function DriverReview() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // === Logic for Automatic Change ===
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 2000); // Changes every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused]); // Re-run when pause state changes

  const review = reviews[index];

  return (
    <section
      className="py-5"
      style={{ backgroundColor: "#F5F7FA" }} // <--- This shade looks premium
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container py-4">
        <div className="row align-items-center g-5">
          {/* ================= LEFT SIDE (Text Content) ================= */}
          <div className="col-lg-6">
            <span className="text-primary fw-bold text-uppercase small letter-spacing-2">
              Success Stories
            </span>

            <h2 className="fw-bold display-5 mt-3 mb-4 text-dark">
              "LoadMitrra changed how I run my truck."
            </h2>

            {/* Animated Content Wrapper */}
            <div className="fade-in-animation" key={index}>
              <span
                className="text-muted opacity-25 display-1 lh-1"
                style={{ fontFamily: "serif" }}
              >
                &ldquo;
              </span>

              <p
                className="text-secondary fs-5 fst-italic mt-n4 mb-4 position-relative z-1"
                style={{ lineHeight: 1.6 }}
              >
                {review.quote}
              </p>

              {/* Author Block */}
              <div className="d-flex align-items-center gap-3 mt-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center bg-light"
                  style={{ width: 56, height: 56 }}
                >
                  <span className="material-symbols-outlined text-primary fs-3">
                    local_shipping
                  </span>
                </div>
                <div>
                  <div className="fw-bold text-dark">{review.name}</div>
                  <div className="text-muted small">{review.role}</div>
                </div>
              </div>
            </div>

            {/* Navigation Dots (Clickable) */}
            <div className="d-flex gap-2 mt-5">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)} // Allow manual click
                  style={{
                    height: 6,
                    width: i === index ? 40 : 12, // Active dot is longer
                    background: i === index ? "#0d6efd" : "#e9ecef",
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE (Stats Grid) ================= */}
          <div className="col-lg-6">
            <div className="row g-4">
              {/* Note: I removed mt-lg-5 to make them perfectly aligned as requested */}

              {/* Card 1 */}
              <div className="col-6">
                <div className="card border p-4 rounded-4 h-100 shadow-sm border-0 bg-white">
                  <h2 className="fw-bold text-primary mb-1 display-5">
                    {review.stats.income}
                  </h2>
                  <p className="text-muted fw-medium mb-0 small">
                    Avg. Income Increase
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-6">
                <div className="card border p-4 rounded-4 h-100 shadow-sm border-0 bg-white">
                  <h2 className="fw-bold text-primary mb-1 display-5">
                    {review.stats.time}
                  </h2>
                  <p className="text-muted fw-medium mb-0 small">
                    Saved per Load Booking
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-6">
                <div className="card border p-4 rounded-4 h-100 shadow-sm border-0 bg-white">
                  <h2 className="fw-bold text-primary mb-1 display-5">
                    {review.stats.guarantee}
                  </h2>
                  <p className="text-muted fw-medium mb-0 small">
                    Payment Guarantee
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="col-6">
                <div className="card border p-4 rounded-4 h-100 shadow-sm border-0 bg-white">
                  <h2 className="fw-bold text-primary mb-1 display-5">
                    {review.stats.support}
                  </h2>
                  <p className="text-muted fw-medium mb-0 small">
                    Live Support Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DriverReview;
