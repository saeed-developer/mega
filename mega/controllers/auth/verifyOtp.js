const mysql = require("mysql");
module.exports.verifyOtp = async function (request, reply) {
  const { number, code } = request.body;
  const otp = await this.redis.get(number);
  console.log(code, otp);
  if (String(otp) === String(code)) {
    const access = await this.jwt.sign(
      {
        username: username,
        id: data[0].id,
      },
      { expiresIn: "1h" }
    );
    const refresh = await this.jwt.sign(
      {
        username: username,
        id: data[0].id,
      },
      { key: process.env.JWT_REFRESH, expiresIn: "7 days" }
    );
    reply.send({ access: access, refresh: refresh });
  } else {
    reply.status(401).send({ message: "not ok" });
  }
};
