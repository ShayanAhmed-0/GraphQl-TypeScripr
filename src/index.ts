import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { logger } from "./utils/logger";
import { setupSockets } from "./sockets";
import connectDB from "./db/connect";

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

async function startServer() {
  await connectDB();
  await server.start();
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer);

  setupSockets(io);

  app.get("/", (req, res) => {
    res.send("server is running");
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    logger.info(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    );
    logger.info(`Socket.IO server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
