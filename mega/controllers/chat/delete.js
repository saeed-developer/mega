const Contact = require("../../models/Contact");

module.exports.deleteContact = async function (request, reply) {
  const { id } = request.user;
  const newContact = request.body.id;
  const contact = new Contact();
  try {
    await contact.deleteContact(id, newContact);
    reply.send({
      message: {
        persian: "مخاطب با موفقیت پاک شد!",
        english: "your contact deleted successfully!",
      },
    });
  } catch (err) {
    reply.send(err);
  }
};
