import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./landing_page/LandingPage";
import About from "./about/About";
import ForDriver from "./fordriver/ForDriver";
import ForSupplier from "./forsupplier/ForSupplier";
import Contact from "./Contact";

import Auth from "./auth/Auth";
import RoleSelection from "./auth/RoleSelection";
import Login from "./auth/Login/Login";
import DriverSignup from "./auth/Signup/DriverSignup";
import DriverVehicleDetails from "./auth/Signup/DriverVehicleDetails";
import SupplierSignup from "./auth/Signup/SupplierSignup";
import { DriverAuthProvider } from "./driver_app/context/DriverAuthContext";
import { SupplierAuthProvider } from "./supplier_app/context/SupplierAuthContext";

import DriverApp from "./driver_app/DriverApp";
import SupplierApp from "./supplier_app/SupplierApp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DriverAuthProvider>
        <SupplierAuthProvider>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/for-drivers" element={<ForDriver />} />
            <Route path="/for-suppliers" element={<ForSupplier />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth layout */}
            <Route path="/auth" element={<Auth />}>
              <Route index element={<RoleSelection />} />
              <Route path="login" element={<Login />} />
              <Route path="signup/driver" element={<DriverSignup />} />
              <Route
                path="signup/driver/vehicle"
                element={<DriverVehicleDetails />}
              />
              <Route path="signup/supplier" element={<SupplierSignup />} />
            </Route>

            {/* Apps */}
            <Route path="/driver/*" element={<DriverApp />} />
            <Route path="/supplier/*" element={<SupplierApp />} />
          </Routes>
        </SupplierAuthProvider>
      </DriverAuthProvider>
    </BrowserRouter>

    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>
);
