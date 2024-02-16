import mysql from "mysql2";

// Imports environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();

// Creates a connection pool
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export default pool;
