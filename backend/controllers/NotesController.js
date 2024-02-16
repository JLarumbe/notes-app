import pool from "../database.js";

//Function to get all notes
const getNotes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM notes");
  res.send(rows);
};

//Function to get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  //Prepared statement to prevent SQL injection
  const [note] = await pool.query(
    `
    SELECT * 
    FROM notes
    WHERE id = ?
     `,
    [id]
  );
  res.send(note);
};

//Function to create a note
const createNote = async (req, res) => {
  const { title, contents } = req.body;

  const [result] = await pool.query(
    `
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
     `,
    [title, contents]
  );

  res.status(201).send(await getNoteById(result.insertId));
};

//Function to update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  const [result] = await pool.query(
    `
    UPDATE notes
    SET title = ?, contents = ?
    WHERE id = ?
     `,
    [title, contents, id]
  );

  res.send(await getNoteById(id));
};

//Function to delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query(
    `
    DELETE FROM notes
    WHERE id = ?
    `,
    [id]
  );

  res.send({ message: "Note deleted" });
};

//Helper function to return a note by id
const getNoteById = async (id) => {
  const [note] = await pool.query(
    `
        SELECT * 
        FROM notes
        WHERE id = ?
         `,
    [id]
  );
  return note;
};

//Export the functions

export { getNotes, getNote, createNote, updateNote, deleteNote };
