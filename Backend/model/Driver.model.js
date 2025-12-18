const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔐 REQUIRED FOR AUTH
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    vehicle: {
      category: {
        type: String,
        enum: ["SCV", "LCV", "MCV"],
      },
      bodyType: {
        type: String,
        enum: ["Open", "Closed"],
      },
      weight: {
        type: Number,
      },
    },

    role: {
      type: String,
      default: "driver",
      immutable: true, // cannot be changed later
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // ✅ OPTIONAL (future use)
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
