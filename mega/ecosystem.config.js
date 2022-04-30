module.exports = {
  apps: [
    {
      name: "View",
      script: "View.js",
      watch: true,
      instances : "max",
      exec_mode : "cluster"
    },
    {
      name: "Auth",
      script: "Authentication.js",
      watch: true,
      instances : "max",
      exec_mode : "cluster"
    },
    {
      name: "Deploy",
      script: "Deployment.js",
      watch: true,
    },
    {
      name: "Chat",
      script: "Chat.js",
      watch: true,
      instances : "max",
      exec_mode : "cluster"
    },
  ],
};
