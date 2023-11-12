import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

//importing routes

import userRouter from "./routes/User.js";
import passwordRouter from "./routes/passwordReset.js";
import notesRouter from "./routes/notesRouter.js";
import directoryHandler from "./routes/directoryHandler.js";
import adminRouter from "./routes/adminRouter.js";
import paperRouter from "./routes/paperRouter.js";
import linkRouter from "./routes/linkRouter.js";
import seniorRouter from "./routes/seniorRouter.js";
import semInsightsRouter from "./routes/semInsightsRouter.js";
import clubsRouter from "./routes/clubsRouter.js";

//importing custom middlewares
import { errorMiddleware } from "./middlewares/errorHandler.js";

export const app = express();

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//for accepting post data in json
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
	  origin: ["https://www.saarathi.me", process.env.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
	  origin: ["https://www.saarathi.me"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = new Map();
const maxOnlineUsers = 75; // Maximum number of online users allowed
const userActivityTimeout = 60 * 31 * 1000; // 31 minute (adjust as needed)

function removeInactiveUsers() {
  const currentTime = Date.now();
  const inactiveUsers = [];

  onlineUsers.forEach((user, userId) => {
    if (currentTime - user.lastActivity > userActivityTimeout) {
      inactiveUsers.push(userId);
    }
  });

  inactiveUsers.forEach((userId) => {
    onlineUsers.delete(userId);
  });

  io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
}

// Periodically check for inactive users and remove them
setInterval(removeInactiveUsers, userActivityTimeout);

io.on("connection", (socket) => {
  socket.on("login", (user) => {
    // Check if the maximum number of online users has been reached
    if (onlineUsers.size >= maxOnlineUsers) {
      // Remove the oldest user
      const oldestUserId = Array.from(onlineUsers.keys())[0];
      onlineUsers.delete(oldestUserId);
    }

    onlineUsers.set(user._id, { ...user, lastActivity: Date.now() });
    io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });

  socket.on("logout", (userId) => {
    onlineUsers.delete(userId._id);
    io.emit("updateOnlineUsers", Array.from(onlineUsers.values()));
  });

  socket.on("heartbeat", (data) => {
    // Update the last activity time for the user
    const user = onlineUsers.get(data._id);
    if (user) {
      user.lastActivity = Date.now();
      onlineUsers.set(data._id, user);
    }
  });

  // Other socket event listeners can be added here
});

// Configurations for "Static-files"
app.set("views", path.join(__dirname, "views"));

// Custom middleware for serving static files with CORS headers
app.use("/public", (req, res, next) => {
  // Set CORS headers to allow requests from both origins
  res.header(
    "Access-Control-Allow-Origin",
    "https://www.saarathi.me"
  );
  res.header("Access-Control-Allow-Methods", "GET"); // Add more methods if needed
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Add more headers if needed

  // Continue to serve the static files
  express.static("public")(req, res, next);
});

app.use("/api/v01/users", userRouter);
app.use("/api/v01/password-reset", passwordRouter);
app.use("/api/v01/notes", notesRouter);
app.use("/api/v01/prevpapers", paperRouter);
app.use("/api/v01/admins", adminRouter);
app.use("/api/v01/links", linkRouter);
app.use("/api/v01/seniortalks", seniorRouter);
app.use("/api/v01/seminsights", semInsightsRouter);
//app.use("/api/v01/clubs", clubsRouter);

app.use("/", (req, res) => {
  res.status(200).render("index");
});

app.use(errorMiddleware);
