import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDriverAuth } from "../../driver_app/context/DriverAuthContext";

const API = process.env.REACT_APP_API_BASE_URL;

function DriverVehicleDetails() {
  const navigate = useNavigate();
  const { driver, token } = useDriverAuth();

  const [vehicle, setVehicle] = useState({
    category: "",
    bodyType: "",
    weight: "",
  });

  const handleCompleteSignup = async () => {
    if (!driver || !token) {
      navigate("/auth/login");
      return;
    }

    // Validation
    if (!vehicle.category || !vehicle.bodyType || !vehicle.weight) {
      alert("Please fill all vehicle details");
      return;
    }

    try {
      await axios.put(
        `${API}/driver/vehicle`,
        {
          category: vehicle.category,
          bodyType: vehicle.bodyType,
          weight: Number(vehicle.weight),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/driver/${driver._id}`);
    } catch (err) {
      console.error("Failed to save vehicle details", err);
      alert("Failed to complete signup. Try again.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="bg-white shadow-lg rounded-4 p-4">
            <h2 className="fw-bold mb-1">Vehicle Details</h2>
            <p className="text-muted mb-3">Step 2 of 2</p>

            <div className="progress mb-4" style={{ height: "6px" }}>
              <div className="progress-bar" style={{ width: "100%" }} />
            </div>

            {/* Vehicle Category */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Vehicle Category</label>
              <select
                className="form-select rounded-pill py-2"
                value={vehicle.category}
                onChange={(e) =>
                  setVehicle({ ...vehicle, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                <option value="SCV">SCV</option>
                <option value="LCV">LCV</option>
                <option value="MCV">MCV</option>
              </select>
            </div>

            {/* Body Type Selection with Icons */}
            <label className="form-label fw-semibold mb-2">Body Type</label>
            <div className="d-flex gap-3 mb-4">
              {["Open", "Closed"].map((type) => (
                <div
                  key={type}
                  className={`border rounded-4 p-3 text-center flex-fill ${
                    vehicle.bodyType === type
                      ? "border-primary bg-light text-primary"
                      : "text-muted"
                  }`}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onClick={() => setVehicle({ ...vehicle, bodyType: type })}
                >
                  <div className="mb-2">
                    {type === "Open" ? (
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "32px" }}
                      >
                        local_shipping
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "32px" }}
                      >
                        inventory_2
                      </span>
                    )}
                  </div>
                  <div className="fw-semibold">{type}</div>
                </div>
              ))}
            </div>

            {/* Load Capacity */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Load Capacity (Kg)
              </label>
              <input
                type="number"
                className="form-control rounded-pill py-2"
                placeholder="e.g. 1200"
                value={vehicle.weight}
                onChange={(e) =>
                  setVehicle({ ...vehicle, weight: e.target.value })
                }
              />
            </div>

            <div className="alert alert-info small rounded-3">
              By adding this vehicle, you confirm that you have valid insurance
              and pollution certificates.
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => navigate("/auth/signup/driver")}
              >
                Back
              </button>

              <button
                className="btn btn-primary rounded-pill px-4 fw-bold"
                onClick={handleCompleteSignup}
              >
                Complete Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverVehicleDetails;
