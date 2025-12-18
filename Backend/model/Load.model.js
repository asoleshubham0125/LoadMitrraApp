// models/Load.model.js
const mongoose = require("mongoose");

const loadSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    price: Number,

    vehicle: {
      category: {
        type: String,
        enum: ["SCV", "LCV", "MCV"],
      },
      bodyType: {
        type: String,
        enum: ["Open", "Closed"],
      },
    },

    weight: Number,

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },

    pickupTimeWindow: {
      start: Date,
      end: Date,
    },

    acceptedPickupTime: Date,

    status: {
      type: String,
      enum: [
        "posted",
        "assigned",
        "in_transit",
        "reached_destination",
        "completed",
      ],
      default: "posted",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    completedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Load", loadSchema);
