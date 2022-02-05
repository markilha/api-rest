const { Pool } = require("pg");

const connection = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});
// const connection = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "gtc_capao_bonito",
//   password: "postgres",
//   port: 5432
// });

module.exports = connection;