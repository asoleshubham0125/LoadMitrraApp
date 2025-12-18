const express = require("express");
const Load = require("../model/Load.model");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* ✅ TEST ROUTE */
router.get("/test", (req, res) => {
  res.send("Load route working");
});

/* ======================================================
   SUPPLIER ROUTES
====================================================== */

/* ✅ SUPPLIER → CREATE LOAD */
router.post("/", auth(["supplier"]), async (req, res) => {
  try {
    const load = await Load.create({
      ...req.body,
      supplierId: req.user.id,
      status: "posted",
    });

    res.status(201).json(load);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ✅ SUPPLIER → GET ALL MY LOADS */
router.get("/supplier/:supplierId", auth(["supplier"]), async (req, res) => {
  // ✅ Convert both to strings for comparison (ObjectId vs string)
  if (String(req.user.id) !== String(req.params.supplierId)) {
    return res.status(403).json({ error: "Access denied" });
  }

  const loads = await Load.find({ supplierId: req.user.id })
    .populate("driverId", "name phone")
    .sort({ createdAt: -1 });

  res.json(loads);
});

/* ✅ SUPPLIER → ACTIVE SHIPMENTS */
router.get(
  "/supplier/:supplierId/active",
  auth(["supplier"]),
  async (req, res) => {
    // ✅ Convert both to strings for comparison (ObjectId vs string)
    if (String(req.user.id) !== String(req.params.supplierId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const loads = await Load.find({
      supplierId: req.user.id,
      status: {
        $in: ["posted", "assigned", "in_transit", "reached_destination"],
      },
    })
      .populate("driverId", "name phone")
      .sort({ updatedAt: -1 });

    res.json(loads);
  }
);

/* ✅ SUPPLIER → BILLING PANEL */
router.get(
  "/supplier/:supplierId/billing",
  auth(["supplier"]),
  async (req, res) => {
    // ✅ Convert both to strings for comparison (ObjectId vs string)
    if (String(req.user.id) !== String(req.params.supplierId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const loads = await Load.find({
      supplierId: req.user.id,
      status: { $in: ["reached_destination", "completed"] },
    }).sort({ updatedAt: -1 });

    res.json(loads);
  }
);

/* ✅ SUPPLIER → PAY FOR LOAD */
router.put("/pay/:loadId", auth(["supplier"]), async (req, res) => {
  const load = await Load.findById(req.params.loadId);

  if (!load) return res.status(404).json({ error: "Load not found" });
  // ✅ Convert both to strings for comparison (ObjectId vs string)
  if (String(load.supplierId) !== String(req.user.id))
    return res.status(403).json({ error: "Access denied" });

  if (load.status !== "reached_destination") {
    return res.status(400).json({
      error: "Driver has not reached destination yet",
    });
  }

  load.paymentStatus = "paid";
  await load.save();

  res.json({ message: "Payment completed", load });
});

/* ======================================================
   DRIVER ROUTES
====================================================== */

/* ✅ DRIVER → AVAILABLE LOADS */
router.get("/available", auth(["driver"]), async (req, res) => {
  const loads = await Load.find({ status: "posted" })
    .populate("supplierId", "companyName")
    .sort({ createdAt: -1 });

  res.json(loads);
});

/* ✅ DRIVER → ACCEPT LOAD */
router.put("/accept/:loadId", auth(["driver"]), async (req, res) => {
  const { acceptedPickupTime } = req.body;

  if (!acceptedPickupTime) {
    return res.status(400).json({ error: "acceptedPickupTime is required" });
  }

  const load = await Load.findById(req.params.loadId);

  if (!load || load.status !== "posted") {
    return res.status(400).json({ error: "Load not available" });
  }

  load.driverId = req.user.id;
  load.acceptedPickupTime = new Date(acceptedPickupTime);
  load.status = "assigned";
  await load.save();

  res.json(load);
});

/* ✅ DRIVER → PICKUP LOAD */
router.put("/pickup/:loadId", auth(["driver"]), async (req, res) => {
  const load = await Load.findOne({
    _id: req.params.loadId,
    driverId: req.user.id,
  });

  if (!load) return res.status(403).json({ error: "Access denied" });

  load.status = "in_transit";
  await load.save();

  res.json(load);
});

/* ✅ DRIVER → REACHED DESTINATION */
router.put("/reached/:loadId", auth(["driver"]), async (req, res) => {
  const load = await Load.findOne({
    _id: req.params.loadId,
    driverId: req.user.id,
  });

  if (!load) return res.status(403).json({ error: "Access denied" });
  if (load.status !== "in_transit") {
    return res.status(400).json({ error: "Load is not in transit" });
  }

  load.status = "reached_destination";
  await load.save();

  res.json({ message: "Reached destination", load });
});

/* ✅ DRIVER → COMPLETE LOAD */
router.put("/complete/:loadId", auth(["driver"]), async (req, res) => {
  const load = await Load.findOne({
    _id: req.params.loadId,
    driverId: req.user.id,
  });

  if (!load) return res.status(403).json({ error: "Access denied" });

  if (load.paymentStatus !== "paid") {
    return res.status(403).json({ error: "Payment not completed yet" });
  }

  if (load.status !== "reached_destination") {
    return res.status(400).json({ error: "Load not ready to complete" });
  }

  load.status = "completed";
  load.completedAt = new Date();
  await load.save();

  res.json({ message: "Load completed", load });
});

/* ✅ DRIVER → MY ACTIVE LOADS */
router.get("/driver/:driverId", auth(["driver"]), async (req, res) => {
  // ✅ Convert both to strings for comparison (ObjectId vs string)
  if (String(req.user.id) !== String(req.params.driverId)) {
    return res.status(403).json({ error: "Access denied" });
  }

  const loads = await Load.find({
    driverId: req.user.id,
    status: { $ne: "completed" },
  })
    .populate("supplierId", "name companyName phone")
    .sort({ updatedAt: -1 });

  res.json(loads);
});

/* ✅ DRIVER → LOAD HISTORY */
router.get("/driver/:driverId/history", auth(["driver"]), async (req, res) => {
  // ✅ Convert both to strings for comparison (ObjectId vs string)
  if (String(req.user.id) !== String(req.params.driverId)) {
    return res.status(403).json({ error: "Access denied" });
  }

  const loads = await Load.find({
    driverId: req.user.id,
    status: "completed",
  }).sort({ completedAt: -1 });

  res.json(loads);
});

module.exports = router;
