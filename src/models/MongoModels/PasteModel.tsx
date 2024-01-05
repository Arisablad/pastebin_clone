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
      min: 2,
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
    // userId: {
    //   type: String,
    //   required: true,
    //   min: 2,
    //   max: 30,
    // },
  },
  { timestamps: true }
);

export const PasteModel =
  mongoose.models.PasteModel || mongoose.model('PasteModel', pasteSchema);
