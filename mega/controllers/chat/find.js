const User = require("../../models/User");

module.exports.findContact = async function (request, reply) {
  const { username, phone } = request.query;
  const user = new User();
  if (username) {
    const finded = await user.findByUsername(username);
    if (finded.length > 0) {
      finded[0];
      reply.send({
        name: finded[0].first_name + " " + finded[0].last_name,
        id: finded[0].id,
      });
    } else {
      reply.code(404).send({
        message: {
          persian: "کاربر مورد نظر یافت نشد!",
        },
      });
    }
  } else if (phone) {
    const finded = await user.findByPhone(phone);
    if (finded.length > 0) {
      finded[0];
      reply.send({
        name: finded[0].first_name + " " + finded[0].last_name,
        id: finded[0].id,
      });
    } else {
      reply.code(404).send({
        message: {
          persian: "کاربر مورد نظر یافت نشد!",
        },
      });
    }
  }
};
