import { model, Schema } from 'mongoose';

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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      required: false,
      default: 'Todo',
    },
  },
  { timestamps: true },
);

noteSchema.index({ tag: 1 });

export const Note = model('Note', noteSchema);
