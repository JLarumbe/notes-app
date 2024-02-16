import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/NotesController.js";

const notesRouter = express.Router();

notesRouter.get("/", getNotes);

notesRouter.get("/:id", getNote);

notesRouter.post("/create", createNote);

notesRouter.put("/update/:id", updateNote);

notesRouter.delete("/delete/:id", deleteNote);

export default notesRouter;
