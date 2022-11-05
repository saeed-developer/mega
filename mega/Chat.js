require("dotenv").config({ path: "./config/.env" });
const { logger } = require("./global/globalObjects");
const fastify = require("fastify")({
  logger:
    process.env.ENVIRONMENT === "development"
      ? {
          prettyPrint: logger,
        }
      : false,
});
const { verifyJwt } = require("./plugins/verifyJwt");
fastify.register(require("fastify-cors"));
verifyJwt(fastify);
const { pool } = require("./config/db");
const { add, addContact } = require("./controllers/chat/add");
const { all, allContacts } = require("./controllers/chat/all");
const { addShema, deleteSchema } = require("./controllers/chat/chatSchema");
const { deleteContact } = require("./controllers/chat/delete");
const { find, findContact } = require("./controllers/chat/find");
const User = require("./models/User");
const query = (async () => {
  try {
    const createTable = await pool.execute(`
      CREATE TABLE IF NOT EXISTS  contacts ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        user_id INT NOT NULL, contact_id VARCHAR(255) NOT NULL ,
       FOREIGN KEY (user_id) REFERENCES users(id),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  } catch (err) {
    throw err;
  }
})();
fastify.get(
  "chat/contacts/find",
  {
    onRequest: [fastify.authenticate],
  },
  findContact
);
fastify.get(
  "chat/contacts/all",
  {
    onRequest: [fastify.authenticate],
  },
  allContacts
);
fastify.post("chat/contacts/add", {
  onRequest: [fastify.authenticate],
  schema: addShema,
  handler: addContact,
});
fastify.post("chat/contacts/delete", {
  onRequest: [fastify.authenticate],
  schema: deleteSchema,
  handler: deleteContact,
});
const start = async (port) => {
  try {
    await fastify.listen(port);
    console.log(`chat port ${port} started`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start(process.env.CHAT_PORT);
