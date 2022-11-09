module.exports.refresh = async function (request, reply) {
  const { refresh: refreshToken } = request.body;
  try {
    const check = await this.jwt.verify(refreshToken, {
      key: process.env.JWT_REFRESH,
    });
    const access = await this.jwt.sign(
      {
        username: check.username,
        id: check.id,
      },
      { expiresIn: "200000" }
    );
    const refresh = await this.jwt.sign(
      {
        username: check.username,
        id: check.id,
      },
      { key: process.env.JWT_REFRESH, expiresIn: "7 days" }
    );
    reply.send({ access: access, refresh: refresh });
  } catch (err) {
    reply.code(406).send({
      message: {
        persian: "دوباره وارد شوید",
        english: "Try to login again",
      },
    });
  }
};
