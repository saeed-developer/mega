const fp = require("fastify-plugin");
require("dotenv").config({ path: "./../config/.env" });
module.exports.verifyJwt = fp(async function (fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const { token } = request.headers;
      const verify = await fastify.jwt.verify(token);
      if (verify) {
        const decoded = await fastify.jwt.decode(token);
        request.user = decoded;
      }
    } catch (err) {
      reply.code(403).send(err);
    }
  });
});
