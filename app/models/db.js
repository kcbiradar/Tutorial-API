const dbConfig = require("../config/db.config");
const { Pool } = require("pg");

const pool = new Pool({
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  port: 5432,
  database: dbConfig.DB,
});

module.exports = pool;
