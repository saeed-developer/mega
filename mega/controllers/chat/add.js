const Contact = require("../../models/Contact");

module.exports.addContact = async function (request, reply) {
  const { id } = request.user;
  const newContact = request.body.id;
  console.log("new contact ===>", newContact, "userid ====>", id);
  const contact = new Contact(newContact, id);
  try {
    await contact.save();
    reply.send({
      message: {
        persian: "مخاطب با موفقیت ذخیره شد!",
        english: "your contact saved successfully!",
      },
    });
  } catch (err) {
    reply.send(err);
  }
};
