module.exports.sendOtpSchema = {
  body: {
    type: "object",
    required: ["number"],
    properties: { number: { type: "string", maxLength: 13 } },
  },
};
module.exports.VerifyOtpSchema = {
  body: {
    type: "object",
    required: ["number", "code"],
    properties: {
      number: { type: "string", maxLength: 13 },
      code: { type: "string", maxLength: 6, minLength: 6 },
    },
  },
};

module.exports.signupScheme = {
  body: {
    type: "object",
    required: ["password", "username", "email"],
    properties: {
      number: { type: "string", maxLength: 13 },
      password: { type: "string", minLength: 8 },
      username: { type: "string" },
      email: {
        type: "string",
        pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
      },
      firstName: { type: "string" },
      lastName: { type: "string" },
    },
  },
};
module.exports.loginSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
  },
};
module.exports.refreshSchema = {
  body: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: { type: "string" },
    },
  },
};
