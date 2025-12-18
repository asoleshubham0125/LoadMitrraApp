import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

import SupplierPanelWrapper from "./PanelWrapper";
import AddressAutocompleteInput from "../components/AddressAutocompleteInput";
import { useSupplierMap } from "../context/SupplierMapContext";

export default function CreateLoadPanel() {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const { route, setRoute } = useSupplierMap();

  const [form, setForm] = useState({
    vehicleCategory: "LCV",
    vehicleBodyType: "Closed",
    weight: "",
    price: "",
    pickupStart: "",
    pickupEnd: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Debug: log changes to see whether datetime-local provides the time portion
    if (name === "pickupStart" || name === "pickupEnd") {
      console.debug("CreateLoadPanel: field change", name, value);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // 1. Validate all fields are present
    if (
      !route.from ||
      !route.to ||
      !form.weight ||
      !form.price ||
      !form.pickupStart ||
      !form.pickupEnd
    ) {
      alert(
        "Please fill in all required fields (Locations, Weight, Price, and Time Window)."
      );
      return;
    }

    try {
      setLoading(true);

      await api.post("/load", {
        from: route.from,
        to: route.to,
        price: Number(form.price),
        weight: Number(form.weight),
        vehicle: {
          category: form.vehicleCategory,
          bodyType: form.vehicleBodyType,
        },
        pickupTimeWindow: {
          start: form.pickupStart,
          end: form.pickupEnd,
        },
      });

      alert("Load created successfully");

      // Reset form
      setForm({
        vehicleCategory: "LCV",
        vehicleBodyType: "Closed",
        weight: "",
        price: "",
        pickupStart: "",
        pickupEnd: "",
      });

      setRoute({ from: "", to: "" });

      // Navigate to shipments panel to see the newly created load
      navigate(`/supplier/${supplierId}/shipments`);
    } catch (err) {
      console.error("Create load error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.msg ||
        err.message ||
        "Failed to create load";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupplierPanelWrapper title="Create Load">
      <div
        className="p-3 d-flex flex-column gap-3"
        style={{ overflowY: "auto", maxHeight: "100%" }}
      >
        {/* FROM */}
        <div>
          <label className="form-label small fw-bold">
            From <span className="text-danger">*</span>
          </label>
          <AddressAutocompleteInput
            placeholder="Pickup Location (From)"
            value={route.from}
            onSelect={(address) =>
              setRoute((prev) => ({ ...prev, from: address }))
            }
          />
        </div>

        {/* TO */}
        <div>
          <label className="form-label small fw-bold">
            To <span className="text-danger">*</span>
          </label>
          <AddressAutocompleteInput
            placeholder="Drop Location (To)"
            value={route.to}
            onSelect={(address) =>
              setRoute((prev) => ({ ...prev, to: address }))
            }
          />
        </div>

        {/* VEHICLE */}
        <div>
          <label className="form-label small fw-bold">
            Vehicle Details <span className="text-danger">*</span>
          </label>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              name="vehicleCategory"
              value={form.vehicleCategory}
              onChange={handleChange}
            >
              <option value="SCV">SCV</option>
              <option value="LCV">LCV</option>
              <option value="MCV">MCV</option>
            </select>

            <select
              className="form-select"
              name="vehicleBodyType"
              value={form.vehicleBodyType}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* WEIGHT */}
        <div>
          <label className="form-label small fw-bold">
            Weight <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="form-label small fw-bold">
            Price <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* PICKUP WINDOW */}
        <div>
          <label className="small text-muted">Pickup Start Time</label>
          <input
            type="datetime-local"
            name="pickupStart"
            step="60"
            className="form-control"
            value={form.pickupStart}
            onChange={handleChange}
          />
          <div className="small text-muted mt-1">
            Selected: {form.pickupStart || "(none)"}
          </div>
        </div>

        <div>
          <label className="small text-muted">Pickup End Time</label>
          <input
            type="datetime-local"
            name="pickupEnd"
            step="60"
            className="form-control"
            value={form.pickupEnd}
            onChange={handleChange}
          />
          <div className="small text-muted mt-1">
            Selected: {form.pickupEnd || "(none)"}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          className="btn btn-primary mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating…" : "Create Load"}
        </button>
      </div>
    </SupplierPanelWrapper>
  );
}
