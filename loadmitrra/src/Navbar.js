import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom py-2"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/LoadMitrra.png"
            alt="LoadMitrra Logo"
            style={{ width: "70px", marginRight: "8px" }}
          />
          <span
            style={{
              fontWeight: "600",
              fontSize: "1.45rem",
              color: "#4682b4",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Load
          </span>
          <span
            style={{
              fontWeight: "600",
              fontSize: "1.45rem",
              color: "#123456",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Mitrra
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="flex-grow-1 d-flex justify-content-center">
            <ul className="navbar-nav gap-4">
              <li className="nav-item">
                <Link
                  className="nav-link fs-6 fw-semibold"
                  style={{ color: "#0F172A" }}
                  to="/about"
                >
                  How it works
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fs-6 fw-semibold"
                  style={{ color: "#0F172A" }}
                  to="/for-drivers"
                >
                  For Drivers
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fs-6 fw-semibold"
                  style={{ color: "#0F172A" }}
                  to="/for-suppliers"
                >
                  For Suppliers
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center gap-4">
            <div className="dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                style={{ color: "#0F172A" }}
              >
                <i class="fa-solid fa-earth-americas"></i> EN
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">EN</button>
                </li>
                <li>
                  <button className="dropdown-item">HI</button>
                </li>
              </ul>
            </div>

            <Link
              className="nav-link fw-semibold"
              style={{ color: "#0F172A" }}
              to="/auth/login"
            >
              Login
            </Link>

            <Link
              className="btn"
              to="/auth"
              style={{
                backgroundColor: "#2563EB",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
