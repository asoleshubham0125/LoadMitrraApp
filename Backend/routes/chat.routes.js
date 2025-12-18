const express = require("express");
const ChatMessage = require("../model/ChatMessage.model");
const Load = require("../model/Load.model");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

/* ======================================================
   GET CHAT MESSAGES FOR A LOAD
   (Only assigned driver OR supplier)
====================================================== */
router.get("/:loadId", auth(["driver", "supplier"]), async (req, res) => {
  try {
    const load = await Load.findById(req.params.loadId);

    if (!load) {
      return res.status(404).json({ error: "Load not found" });
    }

    // 🔐 Allow only assigned driver or supplier
    const isAllowed =
      load.driverId?.toString() === req.user.id ||
      load.supplierId.toString() === req.user.id;

    if (!isAllowed) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await ChatMessage.find({
      loadId: req.params.loadId,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================
   SEND MESSAGE (With Debugging Logs)
====================================================== */
router.post("/:loadId", auth(["driver", "supplier"]), async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const load = await Load.findById(req.params.loadId);

    if (!load) {
      return res.status(404).json({ error: "Load not found" });
    }

    if (load.status === "completed") {
      return res.status(403).json({ error: "Chat closed for completed load" });
    }

    const chat = await ChatMessage.create({
      loadId: req.params.loadId,
      senderId: req.user.id,
      senderRole: determinedRole,
      message,
    });

    res.status(201).json(chat);
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
