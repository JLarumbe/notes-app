import pool from "../database.js";

// Function to get all notes
const getNotes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM notes");
  res.send(rows);
};

// Function to get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  // Check if the note exists
  const isNote = await getNoteById(id);

  // If the note does not exist, return a 404 error
  if (!isNote) {
    return res.status(404).send({ message: "Note not found" });
  }

  // Prepared statement to prevent SQL injection
  const [note] = await pool.query(
    `
    SELECT * 
    FROM notes
    WHERE id = ?
     `,
    [id]
  );

  res.send(note[0]);
};

// Function to create a note
const createNote = async (req, res) => {
  await resetAutoIncrement();

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

// Function to update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  // Check if the note exists
  const note = await getNoteById(id);

  // If the note does not exist, return a 404 error
  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }

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

// Function to delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  // Check if the note exists
  const note = await getNoteById(id);

  // If the note does not exist, return a 404 error
  if (!note) {
    return res.status(404).send({ message: "Note not found" });
  }

  const [result] = await pool.query(
    `
    DELETE FROM notes
    WHERE id = ?
    `,
    [id]
  );

  res.send({ message: "Note deleted" });
};

//==============HELPER FUNCTIONS================

// Helper function to get a note by its id
const getNoteById = async (id) => {
  const [note] = await pool.query(
    `
        SELECT * 
        FROM notes
        WHERE id = ?
         `,
    [id]
  );
  return note[0];
};

// Helper function that resets the auto increment if the notes table is empty
const resetAutoIncrement = async () => {
  const [result] = await pool.query("SELECT * FROM notes");

  if (result.length === 0) {
    await pool.query("ALTER TABLE notes AUTO_INCREMENT = 1");
  }
};

export { getNotes, getNote, createNote, updateNote, deleteNote };
