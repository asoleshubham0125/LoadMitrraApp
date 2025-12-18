import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/LoadMitrra.png";
import { useDriverAuth } from "../../driver_app/context/DriverAuthContext";

function DriverSignup() {
  const navigate = useNavigate();
  const { login } = useDriverAuth();

  const [form, setForm] = useState({
    role: "driver",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || form.name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    if (!form.phone || form.phone.trim() === "") {
      alert("Please enter your phone number");
      return;
    }

    if (!form.email || form.email.trim() === "") {
      alert("Please enter your email");
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
          role: "driver",
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }
      );

      // 🔐 STORE AUTH
      login({
        token: res.data.token,
        driver: res.data.driver,
      });

      // ✅ STEP 2
      navigate("/auth/signup/driver/vehicle");
    } catch (err) {
      console.error("Driver signup failed", err);
      const errorMessage = err.response?.data?.error || err.message || "Signup failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="bg-white shadow-lg rounded-4 p-4">
            {/* Logo */}
            <div className="text-center mb-3">
              <img src={logo} alt="LoadMitrra" style={{ width: "120px" }} />
            </div>

            {/* Heading */}
            <h2 className="fw-bold text-center mb-1">Create Driver Account</h2>
            <p className="text-muted text-center mb-3">
              Step 1 of 2 · Personal Details
            </p>

            {/* Progress bar */}
            <div className="progress mb-4" style={{ height: "6px" }}>
              <div className="progress-bar" style={{ width: "50%" }} />
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
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
                    name="name"
                    className="form-control rounded-pill py-2 ps-5"
                    placeholder="Enter full name"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Mobile Number</label>
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
                    className="form-control rounded-pill py-2 ps-5"
                    placeholder="+91 98765 43210"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
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
                    className="form-control rounded-pill py-2 ps-5"
                    placeholder="name@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control rounded-pill py-2 ps-5 pe-5" // Added ps-5 for consistency, or remove if you want no left icon
                    placeholder="Create password"
                    required
                    onChange={handleChange}
                  />
                  {/* Lock Icon Left (Optional - Remove if you don't want it) */}
                  <span
                    className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    style={{ fontSize: "20px" }}
                  >
                    lock
                  </span>

                  {/* Eye Icon Right */}
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

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control rounded-pill py-2 ps-5 pe-5"
                    placeholder="Repeat password"
                    required
                    onChange={handleChange}
                  />
                  {/* Lock Icon Left */}
                  <span
                    className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    style={{ fontSize: "20px" }}
                  >
                    lock
                  </span>
                  {/* Eye Icon Right */}
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

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
              >
                Continue
              </button>
            </form>

            {/* Divider */}
            <div className="text-center my-4 text-muted">
              — Or continue with —
            </div>

            {/* Google Button */}
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

export default DriverSignup;
