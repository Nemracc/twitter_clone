const { Pool } = require("pg");

//Configurar conexion mediante pool
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "kernel1979",
  database: "twitter_clone",
  port: 5432,
});

module.exports = {
  pool,
};
