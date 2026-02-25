import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All note routes require authentication
router.use(protect);

// /api/notes
router.route("/").get(getNotes).post(createNote);

// /api/notes/:id
router
  .route("/:id")
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

export default router;