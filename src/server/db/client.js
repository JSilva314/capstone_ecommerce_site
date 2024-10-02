const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://capstone_ecommerce_user:GeAfLKzi58sKf3tax7urWdeyxRw5QYoR@dpg-cruadtrv2p9s73eodo50-a/capstone_ecommerce";

const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;
