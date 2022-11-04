const bcrypt = require("bcrypt");
const User = require("../../models/User");
module.exports.signup = async function (request, reply) {
  try {
    const { number, username, password, email, firstName, lastName } =
      request.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User(number, username, email, hash, firstName, lastName);
    const saveUser = await user.save();
    console.log(saveUser);
    reply.send({
      message: {
        english: "you signed up successfully",
        persian: "شما با موفقیت نام نویسی کردید",
      },
    });
  } catch (err) {
    if (err.errno === 1062) {
      if (/users.phone/.test(err.sqlMessage)) {
        reply.code(409).send({
          message: {
            english: "phone already exist",
            persian: "این شماره قبلا ثبت شده است",
          },
        });
      } else if (/users.username/.test(err.sqlMessage)) {
        reply.code(409).send({
          message: {
            english: "username already exist",
            persian: "این نام کاربری قبلا ثبت شده است",
          },
        });
      } else if (/users.email/.test(err.sqlMessage)) {
        reply.code(409).send({
          message: {
            english: "email already exist",
            persian: "این ایمیل قبلا ثبت شده است",
          },
        });
      }
    } else throw err;
  }
};
