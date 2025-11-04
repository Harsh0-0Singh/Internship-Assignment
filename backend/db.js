import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "crossover.proxy.rlwy.net",
  user: "root",
  port:"19181",
  password: "zfiPxsuqfzozyhJSBnRJDFfOcKqCUAhL",
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
