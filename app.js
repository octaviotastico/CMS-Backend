// Library Imports
import cors from "cors";
import http from "http";
import express from "express";
import mongoose from "delay-tolerant-mongoose";
import { Server } from "socket.io";

// Local Imports
import { createDirectory } from "./src/commons/fileSystem.js";
import { parseParameters } from "./src/commons/functions.js";
import calendarRoute from "./src/routes/calendar.js";
import learningRoute from "./src/routes/learning.js";
import usersRoute from "./src/routes/users.js";
import authRoute from "./src/routes/auth.js";
import searchRoute from "./src/routes/searchbar.js";

/// ------------------ ///
/// --- Parameters --- ///
/// ------------------ ///

var args = process.argv.slice(2);

const HTTP_PORT = parseParameters({
  args: args,
  argName: "--http-port",
  envName: "HTTP_PORT",
  defaultValue: 2424,
});

const TCP_PORT = parseParameters({
  args: args,
  argName: "--tcp-port",
  envName: "TCP_PORT",
  defaultValue: 2525,
});

const AGENT_ID = parseParameters({
  args: args,
  argName: "--agent-id",
  envName: "AGENT_ID",
  defaultValue: "bundlesink",
});

const DTN_HOST = parseParameters({
  args: args,
  argName: "--dtn-host",
  envName: "DTN_HOST",
  defaultValue: "localhost",
});

const DTN_PORT = parseParameters({
  args: args,
  argName: "--dtn-port",
  envName: "DTN_PORT",
  defaultValue: 4242,
});

const EID_LIST = parseParameters({
  args: args,
  argName: "--eid-list",
  envName: "EID_LIST",
  defaultValue: ["dtn://b.dtn/bundlesink"],
  list: true,
});

const MONGO_HOST = parseParameters({
  args: args,
  argName: "--mongo-host",
  envName: "MONGO_HOST",
  defaultValue: "localhost",
});

const MONGO_PORT = parseParameters({
  args: args,
  argName: "--mongo-port",
  envName: "MONGO_PORT",
  defaultValue: 27017,
});

const MONGO_DB = parseParameters({
  args: args,
  argName: "--mongo-db",
  envName: "MONGO_DB",
  defaultValue: "cms-db",
});

const MERGE_STRATEGY = parseParameters({
  args: args,
  argName: "--merge-strategy",
  envName: "MERGE_STRATEGY",
  defaultValue: "threeWayMerge",
});

/// ---------------------- ///
/// --- Database setup --- ///
/// ---------------------- ///

// Database Connection
mongoose
  .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Connected to database");
  });

mongoose.configDtnAndStart({
  AGENT_ID,
  DTN_HOST,
  DTN_PORT,
  EID_LIST,
  MERGE_STRATEGY,
});

/// --------------------- ///
/// --- Storage Setup --- ///
/// --------------------- ///

createDirectory("./storage/");
createDirectory("./storage/learning");
createDirectory("./storage/users");

/// ------------------------- ///
/// --- HTTP Server setup --- ///
/// ------------------------- ///

// App setup
const app = express();

app.use("/storage", express.static("storage")); // Here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/calendar", calendarRoute);
app.use("/learning", learningRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/search", searchRoute);

// Listen for HTTP requests on port 2424
app.listen(HTTP_PORT, () => {
  console.info(`HTTP Server up and runnig on port ${HTTP_PORT}!! 🕺🕺🕺`);
});

/// --------------------------- ///
/// --- Socket Server setup --- ///
/// --------------------------- ///

// Socket io server setup.
const server = http.createServer(app);
const io = new Server(server);

// (Move to a separate file).
io.on("connection", (socket) => {
  console.info("Socket connection made!");

  // Wellcome message.
  socket.emit("message", "Hello from the CMS backend!");

  // Listen for messages.
  socket.on("message", (data) => {
    console.info("Received message:", data);
  });

  // Goodbye message.
  socket.on("disconnect", () => {
    console.info("Socket disconnected!");
  });
});

// Listen for socket requests on port 2525
server.listen(TCP_PORT, () => {
  console.info(`Socket Server listening on port ${TCP_PORT}!! 🕺🕺🕺`);
});
