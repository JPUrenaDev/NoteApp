const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");
router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.insertNewNote);

router.route("/:status").get(noteController.getNotesByStatus);
router
  .route("/:id")
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);
module.exports = router;
