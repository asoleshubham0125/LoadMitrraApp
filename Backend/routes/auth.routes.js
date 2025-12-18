const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Driver = require("../model/Driver.model");
const Supplier = require("../model/Supplier.model");

const router = express.Router();

/**
 * ✅ SIGNUP (Driver & Supplier)
 * POST /api/auth/signup
 */
router.post("/signup", async (req, res) => {
  try {
    const { role, email, password, ...rest } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({ error: "Missing required fields: role, email, and password are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const Model = role === "driver" ? Driver : Supplier;

    // Validate driver-specific required fields
    if (role === "driver") {
      if (!rest.name || rest.name.trim() === "") {
        return res.status(400).json({ error: "Name is required" });
      }
      if (!rest.phone || rest.phone.trim() === "") {
        return res.status(400).json({ error: "Phone number is required" });
      }
    }

    // Validate supplier-specific required fields
    if (role === "supplier") {
      if (!rest.name || rest.name.trim() === "") {
        return res.status(400).json({ error: "Name is required" });
      }
      if (!rest.companyName || rest.companyName.trim() === "") {
        return res.status(400).json({ error: "Company name is required" });
      }
      if (!rest.phone || rest.phone.trim() === "") {
        return res.status(400).json({ error: "Phone number is required" });
      }
    }

    // Check for duplicate email
    const exists = await Model.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check for duplicate phone (if driver)
    if (role === "driver" && rest.phone) {
      const phoneExists = await Driver.findOne({ phone: rest.phone });
      if (phoneExists) {
        return res.status(400).json({ error: "Phone number already exists" });
      }
    }

    const user = await Model.create({
      email,
      password: hashedPassword,
      role,
      ...rest,
    });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      driver:
        role === "driver"
          ? {
              _id: user._id,
              id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
            }
          : null,
      supplier:
        role === "supplier"
          ? {
              _id: user._id,
              id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              companyName: user.companyName,
              role: user.role,
            }
          : null,
    });
  } catch (err) {
    console.error("Signup error:", err);

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors.join(", ") });
    }

    // Handle duplicate key errors (unique constraint)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `${field} already exists` });
    }

    // Handle other errors
    res.status(400).json({ 
      error: err.message || "Signup failed. Please check your input." 
    });
  }
});

/**
 * ✅ LOGIN
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const Model = role === "driver" ? Driver : Supplier;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      driver:
        role === "driver"
          ? {
              _id: user._id,
              id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
              vehicle: user.vehicle,
            }
          : null,
      supplier:
        role === "supplier"
          ? {
              _id: user._id,
              id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              companyName: user.companyName,
              role: user.role,
            }
          : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
