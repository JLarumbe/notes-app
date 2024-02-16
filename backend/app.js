import express from "express";

import { getNotes, getNote, createNote } from "./database.js";

// Create the server
const app = express();

app.get("/notes", (req, res) => {
  getNotes().then((notes) => {
    res.json(notes);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:3000");
});
