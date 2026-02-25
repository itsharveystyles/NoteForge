import Note from "../models/Note.js";

// Create Note
export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Get All Notes (scoped to authenticated user)
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get single note by ID
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

// Update note
export const updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    const updated = await note.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete note
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};