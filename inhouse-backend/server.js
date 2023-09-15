require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./database");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin: [process.env.FRONTEND_URL],
};
app.use(cors(corsOptions));
app.use("/storage", express.static("storage"));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({ limit: "8mb" }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello cowboy");
});

// Sockets

const socketUserMapping = {};
let doubts = [];

function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        user: socketUserMapping[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("new connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;
    socket.join(roomId);

    // new Map
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        user,
        socketId: socket.id,
      });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
      socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
      io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on("doubt", ({ roomId, username, doubt }) => {
      doubts.push({
        [username]: doubt
      });
      //doubts[username] = doubt;
      const clients = getAllConnectedClients(roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit("doubt", {
          doubts,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          user: socketUserMapping[socket.id],
        });
      });
      doubts = []
      delete socketUserMapping[socket.id];
      //delete doubts[socket.id];
      socket.leave();
    });
    

    // socket.emit(ACTIONS.ADD_PEER, {});
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
