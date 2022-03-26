const fastify = require("fastify");
const fastifyIO = require("fastify-socket.io");
require("dotenv").config({ path: "./config/.env" });
const server = fastify();
server.register(fastifyIO);

server.get("/", (req, reply) => {
  server.io.emit("hello");
});

server.ready().then(() => {
  // we need to wait for the server to be ready, else `server.io` is undefined
  server.io.on("connection", (socket) => {
    console.log("connection");
  });
});

server.listen(process.env.CHATROOM_PORT);
