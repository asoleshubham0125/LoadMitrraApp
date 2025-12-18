const express = require("express");
const mongoose = require("mongoose");
const Driver = require("../model/Driver.model");
const Load = require("../model/Load.model");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* =========================================================
   DRIVER → GET PROFILE (USED BY DriverWebLayout)
   ========================================================= */
router.get("/:driverId", auth(["driver"]), async (req, res) => {
  try {
    // ✅ IMPORTANT: Convert both to strings for comparison (ObjectId vs string)
    if (String(req.user.id) !== String(req.params.driverId)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const driver = await Driver.findById(req.params.driverId).select(
      "-password"
    );

    if (!driver) {
      return res.status(404).json({ msg: "Driver not found" });
    }

    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   DRIVER → COMPLETE VEHICLE DETAILS (STEP 2 SIGNUP)
   ========================================================= */
router.put("/vehicle", auth(["driver"]), async (req, res) => {
  try {
    const { category, bodyType, weight } = req.body;

    if (!category || !bodyType || !weight) {
      return res.status(400).json({
        error: "Vehicle category, body type and weight are required",
      });
    }

    const driver = await Driver.findByIdAndUpdate(
      req.user.id, // ✅ FIXED (was _id)
      {
        vehicle: {
          category,
          bodyType,
          weight,
        },
      },
      { new: true }
    );

    res.json({
      message: "Vehicle details saved successfully",
      driver,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================================================
   DRIVER → EARNINGS SUMMARY
   ========================================================= */
router.get(
  "/:driverId/earnings/summary",
  auth(["driver"]),
  async (req, res) => {
    try {
      // ✅ Convert both to strings for comparison (ObjectId vs string)
      if (String(req.user.id) !== String(req.params.driverId)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      const driverId = new mongoose.Types.ObjectId(req.params.driverId);

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );

      const calculate = async (date) => {
        const result = await Load.aggregate([
          {
            $match: {
              driverId,
              status: "completed",
              paymentStatus: "paid",
              completedAt: { $gte: date },
            },
          },
          {
            $group: { _id: null, total: { $sum: "$price" } },
          },
        ]);

        return result[0]?.total || 0;
      };

      res.json({
        today: await calculate(startOfToday),
        week: await calculate(startOfWeek),
        month: await calculate(startOfMonth),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =========================================================
   DRIVER → EARNINGS TRANSACTIONS
   ========================================================= */
router.get(
  "/:driverId/earnings/transactions",
  auth(["driver"]),
  async (req, res) => {
    try {
      // ✅ Convert both to strings for comparison (ObjectId vs string)
      if (String(req.user.id) !== String(req.params.driverId)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      const loads = await Load.find({
        driverId: req.params.driverId,
        status: "completed",
      })
        .select("from to price paymentStatus completedAt")
        .sort({ completedAt: -1 });

      res.json(loads);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/* =========================================================
   DRIVER → ACTIVE LOADS / DASHBOARD
   ========================================================= */
router.get("/:driverId/loads/active", auth(["driver"]), async (req, res) => {
  try {
    // ✅ Convert both to strings for comparison (ObjectId vs string)
    if (String(req.user.id) !== String(req.params.driverId)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const loads = await Load.find({
      driverId: req.params.driverId,
      status: { $ne: "completed" },
    })
      .populate("supplierId", "name phone companyName")
      .sort({ updatedAt: -1 });

    res.json(loads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
