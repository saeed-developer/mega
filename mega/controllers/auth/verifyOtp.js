module.exports.verifyOtp = async function (request, reply) {
  const { number, code } = request.body;
  const data = await this.redis.hgetall(number);

  if (String(data.otp) === String(code)) {
    const access = await this.jwt.sign(
      {
        username: data.username,
        id: data.id,
      },
      { expiresIn: "1h" }
    );
    const refresh = await this.jwt.sign(
      {
        username: data.username,
        id: data.id,
      },
      { key: process.env.JWT_REFRESH, expiresIn: "7 days" }
    );
    await this.redis.set(data[0].id, refresh, "EX", 60 * 60 * 24 * 7);
    reply.send({ access: access, refresh: refresh });
  } else {
    reply.status(401).send({
      message: {
        persian: "کد تایید اشتباه است",
      },
    });
  }
};
