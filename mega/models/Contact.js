const { pool } = require("./../config/db");
class Contact {
  constructor(userId, contactId) {
    this.userId = userId;
    this.contactId = contactId;
  }
  async save() {
    const sql = `INSERT INTO contacts (user_id , contact_id) SELECT ${Number(
      this.userId
    )}, ${Number(this.contactId)} WHERE NOT EXISTS (
        SELECT * FROM
          contacts
        WHERE
          user_id = ${Number(this.userId)}
          AND contact_id = ${Number(this.contactId)}
      )`;
    await pool.execute(sql);
  }
  async findContacts(contactId) {
    const sql = `SELECT  user_id ,first_name , last_name , username FROM contacts LEFT JOIN users ON contacts.user_id = users.id 
    where contact_id = ${contactId}
    `;
    const results = await pool.execute(sql);
    return results[0];
  }
  async deleteContact(contactId, userId) {
    const sql = `DELETE  FROM contacts WHERE contact_id = ${contactId} AND user_id = ${userId}`;
    await pool.execute(sql);
  }
}
module.exports = Contact;
