const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    loadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Load",
      required: true,
    },

    senderRole: {
      type: String,
      enum: ["driver", "supplier"],
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
