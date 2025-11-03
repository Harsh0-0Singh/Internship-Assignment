import mysql from "mysql2";
const db = mysql.createConnection({
  host: "crossover.proxy.rlwy.net",
  user: "root",
  password: "zfiPxsuqfzozyhJSBnRJDFfOcKqCUAhL",
  database: "railway",
  port:19181,
  connectTimeout: 20000
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL connected");
});

export default db;
