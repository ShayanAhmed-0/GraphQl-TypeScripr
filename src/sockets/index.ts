import { Server as SocketIOServer } from "socket.io";

export const setupSockets = (io: SocketIOServer) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
