module.exports.logout = async function (request, reply) {
  try {
    const token = request.headers.token;
    const check = await this.jwt.verify(token, {
      key: process.env.JWT_SECRET,
    });
    const deleteKey = await this.redis.del(check.id);
    if (deleteKey === 1) {
      reply.code(200).send();
    } else if (deleteKey === 0) {
      reply.code(404).send({
        message: {
          persian: "کاربر یافت نشد",
          english: "user not found",
        },
      });
    }
  } catch (err) {
    throw err;
  }
};
