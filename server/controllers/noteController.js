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
      // If auth middleware attaches req.user, associate note with that user
      user: req.user ? req.user.id : undefined,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// Get All Notes (optionally scoped to authenticated user)
export const getNotes = async (req, res, next) => {
  try {
    const query = {};
    if (req.user) {
      query.user = req.user.id;
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Get single note by ID
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

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

    const note = await Note.findById(req.params.id);

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
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};