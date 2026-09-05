import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: false,
      default: '',
    },
    tag: {
      type: String,
      enum: TAGS,
      required: false,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

noteSchema.index({ tag: 1, userId: 1 });

export const Note = model('Note', noteSchema);
