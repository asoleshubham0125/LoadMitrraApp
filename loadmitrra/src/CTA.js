import React from "react";
import "./CTA.css";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigation = useNavigate();

  const handleSignup = () => {
    navigation("/auth");
  };

  const handleContact = () => {
    navigation("/contact");
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="cta-wrapper position-relative text-center">
          <svg
            className="cta-wave"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>

          <div className="cta-content position-relative">
            <h2 className="fw-bold text-white mb-3">
              Ready to move?
              <br />
              Join LoadMitrra today.
            </h2>

            <p className="text-white-50 mb-4">
              Whether you're a driver looking for loads or a supplier needing
              transport, we have the solution for you.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                className="btn btn-light fw-semibold px-4"
                onClick={handleSignup}
              >
                Get Started
              </button>
              <button
                className="btn btn-primary fw-semibold px-4"
                onClick={handleContact}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
