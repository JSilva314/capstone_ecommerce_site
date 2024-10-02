const { Client } = require("pg");
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://capstone1_1p4k_user:wZMzSJVLDTP4WdcPt8xOK11Pgqw6Bbb8@dpg-cru9lkbv2p9s73eo3ubg-a/capstone1_1p4k";

const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;
