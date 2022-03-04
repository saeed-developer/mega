const Contact = require("../../models/Contact");

module.exports.allContacts = async function (request, reply) {
  const { id } = request.user;
  const contact = new Contact();
  const allContacts = await contact.findContacts(id);
  console.log(allContacts);
  if (allContacts.length > 0) {
    reply.send(allContacts);
  } else {
    reply.code(404).send({
      message: {
        persian: "لیست مخاطبین خالی است!",
        english: "The contact list is empty",
      },
    });
  }
};
