import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/NotesController.js";

// Create a router
const notesRouter = express.Router();

// Get all notes
notesRouter.get("/", getNotes);

// Get a single note
notesRouter.get("/:id", getNote);

// Create a note
notesRouter.post("/create", createNote);

// Update a note
notesRouter.put("/update/:id", updateNote);

// Delete a note
notesRouter.delete("/delete/:id", deleteNote);

export default notesRouter;
