module.exports = {
  apps: [
    {
      name: "bip",
      script: "build/index.js",
      instances: 0,
      exec_mode: "cluster",
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};
