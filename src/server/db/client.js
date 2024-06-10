const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://silvaj314@localhost:5432/capstone_db";
// "postgres://capstone_l412_user:RVkZ95kUHLEFOwIGpG852Vv0Dp0EzC1R@dpg-cp811omd3nmc73f740n0-a.oregon-postgres.render.com/capstone_l412";

const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;
