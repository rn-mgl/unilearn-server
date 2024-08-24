import mysql from "mysql2/promise";

const connect = () => {
  mysql.createPool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
};

export default connect;
