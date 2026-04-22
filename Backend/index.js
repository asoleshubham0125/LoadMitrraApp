require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);

// Configure Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Make 'io' available inside Express routes
app.set("io", io);

io.on("connection", (socket) => {
  console.log(`New Socket Connection: ${socket.id}`);

  // User joins a specific chat room by Load ID
  socket.on("join_room", (loadId) => {
    socket.join(loadId);
    console.log(`Socket ${socket.id} joined room: ${loadId}`);
  });

  socket.on("disconnect", () => {
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

app.use(cors({}));
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

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
