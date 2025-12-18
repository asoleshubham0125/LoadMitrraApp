require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/supplier", require("./routes/supplier.routes"));
app.use("/api/driver", require("./routes/driver.routes"));
app.use("/api/load", require("./routes/load.routes"));
app.use("/api/chat", require("./routes/chat.routes"));

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
