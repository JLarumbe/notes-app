import express from "express";

// Imports environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();

import notesRouter from "./routes/Notes.js";

// Create the server
const app = express();

// Add middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
  next();
});

// Add the notes router
app.use("/notes", notesRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
