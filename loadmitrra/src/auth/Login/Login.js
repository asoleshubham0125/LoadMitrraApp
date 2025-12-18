import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import semitruck from "../../assets/SemiTruck.png";
import logo from "../../assets/LoadMitrra.png";
import { useDriverAuth } from "../../driver_app/context/DriverAuthContext";
import { useSupplierAuth } from "../../supplier_app/context/SupplierAuthContext";

const API = process.env.REACT_APP_API_BASE_URL;

function LoginDriver() {
  const navigate = useNavigate();
  const { login: driverLogin } = useDriverAuth();
  const { login: supplierLogin } = useSupplierAuth();

  const [role, setRole] = useState("driver");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/auth/login`, {
        email: form.email,
        password: form.password,
        role,
      });

      if (role === "driver") {
        // 🔐 STORE DRIVER AUTH
        driverLogin({
          token: res.data.token,
          driver: res.data.driver,
        });

        // ✅ Navigate to driver app
        navigate(`/driver/${res.data.driver._id}`);
      } else if (role === "supplier") {
        // 🔐 STORE SUPPLIER AUTH
        supplierLogin({
          token: res.data.token,
          supplier: res.data.supplier,
        });

        // ✅ Navigate to supplier app
        navigate(`/supplier/${res.data.supplier._id}`);
      }
    } catch (err) {
      alert(err.response?.data?.msg || err.response?.data?.error || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Login Triggered");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col text-center mb-4 mt-5">
            <img
              src={logo}
              alt="LoadMitrra Logo"
              style={{ width: "140px", objectFit: "contain" }}
            />
            <div>
              <span
                style={{
                  fontWeight: "800",
                  fontSize: "3rem",
                  color: "#4682b4",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Load
              </span>
              <span
                style={{
                  fontWeight: "800",
                  fontSize: "3rem",
                  color: "#123456",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Mitrra
              </span>
            </div>
          </div>
        </div>

        <div className="row shadow-lg rounded-4 overflow-hidden bg-white">
          <div className="col-md-6 p-0 d-none d-md-block">
            <div className="position-relative h-100">
              <img
                src={semitruck}
                alt="Semi Truck"
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-6 p-5">
            <div className="mb-4">
              <h2 className="fw-bold">Login to LoadMitrra</h2>
              <p className="text-muted">
                Please enter your details to continue
              </p>
            </div>

            <div className="d-flex bg-light rounded-pill p-1 mb-4">
              <button
                type="button"
                className={`btn w-50 rounded-pill ${
                  role === "driver" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setRole("driver")}
              >
                Driver Login
              </button>
              <button
                type="button"
                className={`btn w-50 rounded-pill ${
                  role === "supplier" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setRole("supplier")}
              >
                Supplier Login
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email / Mobile Input */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  {/* Left Icon: Person */}
                  <span
                    className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    style={{ fontSize: "20px" }}
                  >
                    person
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill py-2 ps-5" // ps-5 to avoid overlap
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-2">
                <label className="form-label fw-semibold">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  {/* Left Icon: Lock */}
                  <span
                    className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    style={{ fontSize: "20px" }}
                  >
                    lock
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control rounded-pill py-2 ps-5 pe-5" // ps-5 (left) pe-5 (right)
                    required
                    onChange={handleChange}
                  />

                  {/* Right Icon: Eye Toggle */}
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

              <div className="text-end mb-4">
                <a href="#" className="text-primary text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold mb-3"
              >
                Login
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 rounded-pill py-2"
                onClick={handleGoogleLogin}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="18"
                  className="me-2"
                />
                Continue with Google
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              New to LoadMitrra?{" "}
              <a href="/auth/" className="text-primary fw-semibold">
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginDriver;
