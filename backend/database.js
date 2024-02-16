import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

//Create a connection pool
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//Create a function to get all notes
async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

//Create a function to get a single note
async function getNote(id) {
  //Prepared statement to prevent SQL injection
  const [note] = await pool.query(
    `
    SELECT * 
    FROM notes
    WHERE id = ?
     `,
    [id]
  );
  return note[0];
}

//Create a function to create a new note
async function createNote(title, content) {
  const [result] = await pool.query(
    `
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
     `,
    [title, content]
  );

  return getNote(result.insertId);
}

export { getNotes, getNote, createNote };
