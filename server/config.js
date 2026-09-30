require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });
const pg = require("pg");

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 5432,
});

module.exports = db;
