import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/LoadMitrra.png";

export default function Footer() {
  return (
    <footer
      className="text-light pt-5 pb-3 mt-5"
      style={{ background: "#0A1A2F" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <img
              src={logo}
              alt="LoadMitrra Logo"
              style={{
                width: "120px",
                marginBottom: "12px",
                objectFit: "contain",
              }}
            />
            <h3 className="fw-bold">LoadMitrra</h3>
            <p className="mt-2">
              Smart, fast and reliable truck management & load-matching
              platform.
            </p>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled mt-2">
              <li>
                <Link className="footer-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Services</h5>
            <ul className="list-unstyled mt-2">
              <li>
                <a className="footer-link" href="">
                  Fleet Tracking
                </a>
              </li>
              <li>
                <a className="footer-link" href="">
                  Smart Load Matching
                </a>
              </li>
              <li>
                <a className="footer-link" href="/for-drivers">
                  Driver App
                </a>
              </li>
              <li>
                <a className="footer-link" href="">
                  Supplier App
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Contact Us</h5>

            {/* Email Section */}
            <p className="mt-2 d-flex align-items-center">
              <span className="material-symbols-outlined me-2">mail</span>
              <span>loadmitrra@gmail.com</span>
            </p>

            {/* Phone Section */}
            <p className="d-flex align-items-center">
              <span className="material-symbols-outlined me-2">call</span>
              <span>+91 8767239628</span>
            </p>

            {/* Social Icons Section */}
            <div className="d-flex align-items-center gap-4 mt-3">
              {/* Portfolio Icon */}
              <div className="custom-tooltip">
                <a
                  href="https://shubhamasoleportfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  <i className="fa-regular fa-address-book fs-4"></i>
                </a>
                <span className="tooltip-text">View Portfolio</span>
              </div>

              {/* LinkedIn Icon */}
              <div className="custom-tooltip">
                <a
                  href="https://www.linkedin.com/in/shubham-asole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  <i className="fa-brands fa-linkedin fs-4"></i>
                </a>
                <span className="tooltip-text">Connect on LinkedIn</span>
              </div>

              {/* Instagram Icon */}
              <div className="custom-tooltip">
                <a
                  href="https://www.instagram.com/shubhamasole0125?igsh=MWNnamVhY2t3YW55"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  <i className="fa-brands fa-instagram fs-4"></i>
                </a>
                <span className="tooltip-text">Follow on Insta</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="mb-0">
            © {new Date().getFullYear()} LoadMitrra. All Rights Reserved.{" "}
            <Link
              to="https://shubhamasoleportfolio.vercel.app/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Shubham Asole
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
