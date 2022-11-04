const { pool } = require("./../config/db");
class User {
  constructor(
    phone = null,
    username,
    password,
    email,
    firstName = null,
    lastName = null,
    id
  ) {
    this.phone = Number(phone);
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.password = password;
    this.email = email;
  }

  async save() {
    const sql = `INSERT INTO users (phone , username , password  , first_name , last_name , email) VALUES ("${this.phone}", "${this.username}" ,
        "${this.password}" ,"${this.firstName}" , "${this.lastName}" , "${this.email}")`;
    await pool.execute(sql);
  }
  async findById(id) {
    const sql = `select * from users where id = ${id}`;
    const results = await pool.execute(sql);
    return results[0];
  }
  async findByPhone(phone) {
    const sql = `select * from users where phone = ${phone}`;
    const results = await pool.execute(sql);
    return results[0];
  }
  async findByUsername(username) {
    const sql = `select * from users where username = "${username}"`;
    const results = await pool.execute(sql);
    return results[0];
  }
}
module.exports = User;
