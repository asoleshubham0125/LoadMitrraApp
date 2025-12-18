import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/LoadMitrra.png";
import { useSupplierAuth } from "../../supplier_app/context/SupplierAuthContext";

function SupplierSignup() {
  const navigate = useNavigate();
  const { login } = useSupplierAuth();

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Check if all fields have values and passwords match
  const isFormValid =
    form.fullName.trim() !== "" &&
    form.companyName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.fullName || form.fullName.trim() === "") {
      alert("Please enter your full name");
      return;
    }

    if (!form.companyName || form.companyName.trim() === "") {
      alert("Please enter your company name");
      return;
    }

    if (!form.email || form.email.trim() === "") {
      alert("Please enter your email");
      return;
    }

    if (!form.phone || form.phone.trim() === "") {
      alert("Please enter your phone number");
      return;
    }

    if (!form.password || form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
        {
          role: "supplier",
          name: form.fullName.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          password: form.password,
        }
      );

      // 🔐 STORE AUTH
      login({
        token: res.data.token,
        supplier: res.data.supplier,
      });

      // ✅ Navigate to supplier app
      navigate(`/supplier/${res.data.supplier._id || res.data.supplier.id}`);
    } catch (err) {
      console.error("Supplier signup failed", err);
      const errorMessage = err.response?.data?.error || err.message || "Signup failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="bg-white shadow-lg rounded-4 p-4">
            {/* Logo */}
            <div className="text-center mb-3">
              <img src={logo} alt="LoadMitrra" style={{ width: "120px" }} />
            </div>

            {/* Header */}
            <h2 className="fw-bold text-center mb-1">Supplier Signup</h2>
            <p className="text-muted text-center mb-4">
              Join our network to connect with reliable drivers.
            </p>

            <form onSubmit={handleSubmit}>
              {/* ROW 1: Full Name + Company */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="position-relative">
                    <span
                      className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      style={{ fontSize: "20px" }}
                    >
                      person
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control rounded-pill ps-5 py-2"
                      placeholder="e.g. Rahul Sharma"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Company Name</label>
                  <div className="position-relative">
                    <span
                      className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      style={{ fontSize: "20px" }}
                    >
                      business
                    </span>
                    <input
                      type="text"
                      name="companyName"
                      className="form-control rounded-pill ps-5 py-2"
                      placeholder="e.g. Sharma Logistics"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ROW 2: Email + Phone */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>
                  <div className="position-relative">
                    <span
                      className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      style={{ fontSize: "20px" }}
                    >
                      mail
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-pill ps-5 py-2"
                      placeholder="name@company.com"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <div className="position-relative">
                    <span
                      className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                      style={{ fontSize: "20px" }}
                    >
                      call
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control rounded-pill ps-5 py-2"
                      placeholder="+91 98765 43210"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ROW 3: Passwords */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control rounded-pill pe-5 py-2"
                      placeholder="Create password"
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="form-control rounded-pill pe-5 py-2"
                      placeholder="Repeat password"
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`btn w-100 py-2 fw-bold rounded-pill ${
                  isFormValid ? "btn-primary" : "btn-secondary"
                }`}
                style={{
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
              >
                Sign Up
              </button>
            </form>

            {/* Divider */}
            <div className="text-center my-4 text-muted">
              — Or continue with —
            </div>

            {/* Google */}
            <button className="btn btn-outline-secondary w-100 rounded-pill py-2">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width="18"
                className="me-2"
              />
              Use Google account
            </button>

            {/* Footer */}
            <p className="text-center mt-4 mb-0">
              Already have an account?{" "}
              <span
                className="text-primary fw-semibold"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/auth/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierSignup;
