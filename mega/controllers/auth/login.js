const User = require("../../models/User");
const bcrypt = require("bcrypt");
module.exports.login = async function (request, reply) {
  const { username, password } = request.body;
  const user = new User();
  try {
    const data = await user.findByUsername(username);
    const checkPass = await bcrypt.compare(password, data[0].password);
    if (checkPass) {
      const access = await this.jwt.sign(
        {
          username: username,
          id: data[0].id,
        },
        { expiresIn: "60000" }
      );
      const refresh = await this.jwt.sign(
        {
          username: username,
          id: data[0].id,
        },
        { key: process.env.JWT_REFRESH, expiresIn: "7 days" }
      );
      await this.redis.set(data[0].id, refresh, "EX", 60 * 60 * 24 * 7);
      reply.send({ access: access, refresh: refresh });
    } else {
      reply.code(401).send({
        message: {
          english: "your username or password wrong",
          persian: "نام کاربری یا گذرواژه شما اشتباه است",
        },
      });
    }
  } catch (err) {
    throw err;
  }
};
