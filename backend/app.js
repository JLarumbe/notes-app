import express from "express";

import notesRouter from "./routes/Notes.js";

// Create the server
const app = express();

// Add middleware to parse JSON
app.use(express.json());

app.use("/notes", notesRouter);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
