const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "HIppO1324",
  host: "localhost",
  port: 5432,
  database: "unimelb_subjects",
});

module.exports = pool;
