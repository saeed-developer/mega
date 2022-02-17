const axios = require("axios");
const User = require("../../models/User");
module.exports.sendOtp = async function (request, reply) {
  const { number } = request.body;
  const user = new User();
  const data = await user.findByPhone(number);
  if (data.length > 0) {
    let otp = "";
    for (let number = 0; number < 6; number++) {
      const digit = Math.floor(Math.random() * 10);
      otp += String(digit);
    }
    const farazsms = await axios.post("http://ippanel.com/api/select", {
      op: "send",
      uname: "09374613195",
      pass: "faraz3242056663",
      message: `کدتایید شما در پیوی چنل: ${otp} \n زمان ارسال : ${new Date(
        Date.now()
      )
        .toString()
        .slice(16, 24)}`,
      from: "3000505",
      to: [String(request.body.number)],
    });
    if (farazsms.status === 200) {
      await this.redis.hmset(
        request.body.number,
        "otp",
        otp,
        "username",
        data[0].username,
        "id",
        data[0].id
      );
      await this.redis.expire(request.body.number, 180);
      reply.send({ message: "sms has sent" });
    } else {
      reply.code(503).send({
        message: {
          persian: "اس ام اس ارسال نشد",
        },
      });
    }
  } else {
    reply.code(404).send({
      message: {
        persian: "کاربری با این شماره تلفن پیدا نشد",
      },
    });
  }
};
