import mongoose from 'mongoose';

export const pasteSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    syntax: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    exposure: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    title: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    code: {
      type: String,
      required: true,
      min: 5,
    },
    userId: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    comments: {
      type: [
        {
          user: {
            type: String,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    }
  },
  { timestamps: true }
);

export const PasteModel =
  mongoose.models.PasteModel || mongoose.model('PasteModel', pasteSchema);
