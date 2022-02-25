module.exports.deleteSchema = {
  body: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
module.exports.addShema = {
  body: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
