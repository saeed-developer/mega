require("dotenv").config({ path: "./config/.env" });
const fastify = require("fastify")({
  logger:
    process.env.ENVIRONMENT === "development"
      ? {
          prettyPrint: logger,
        }
      : false,
});
const { pool } = require("./config/db");
const User = require("./models/User");
const query = (async () => {
  try {
    const createTable = await pool.execute(`
      CREATE TABLE IF NOT EXISTS  contacts ( id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        user_id INT NOT NULL, contact_id VARCHAR(255) NOT NULL UNIQUE,
       FOREIGN KEY (user_id) REFERENCES users(id),created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  } catch (err) {
    throw err;
  }
})();
//fastify.post("/contacts");
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
