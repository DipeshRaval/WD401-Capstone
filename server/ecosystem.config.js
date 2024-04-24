module.exports = {
  apps: [
    {
      name: "Online Voting System",
      script: "index.js",
      instances: 5,
      wait_ready: true,
      exec_mode: "cluster",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      log_file: "logs/combined.log",
      merge_logs: true,
      autorestart: false,
      env_production: {
        PORT: 3000
      }
    },
  ],
};
