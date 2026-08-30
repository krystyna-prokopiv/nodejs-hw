import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

  if (tag) {
    notesQuery.where('tag').in(tag);
  }

  if (search) {
    notesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }
  const [notes, totalNotes] = await Promise.all([
    notesQuery.skip(skip).limit(perPage),
    notesQuery.clone().countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);
  res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);

  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const updateNote = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
  });

  if (!updateNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updateNote);
};
