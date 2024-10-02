const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://capstone1_99au_user:YJghCSEfckCr6oMp1FflMM37ibVc7i7q@dpg-cru8t9rv2p9s73enq6o0-a/capstone1_99au";

const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;
