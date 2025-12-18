const express = require("express");
const Supplier = require("../model/Supplier.model");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* ✅ TEST ROUTE (OPTIONAL, KEEP OR REMOVE) */
router.get("/test", (req, res) => {
  res.send("Supplier route working");
});

/* ✅ GET SUPPLIER PROFILE (DASHBOARD) */
router.get("/:supplierId", auth(["supplier"]), async (req, res) => {
  try {
    // 🔐 Ensure supplier accesses ONLY own profile
    // ✅ Convert both to strings for comparison (ObjectId vs string)
    if (String(req.user.id) !== String(req.params.supplierId)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const supplier = await Supplier.findById(req.params.supplierId).select(
      "-password"
    );

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
