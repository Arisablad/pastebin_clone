import mongoose from 'mongoose';
import { pasteSchema } from './PasteModel';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 40,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    pastes: {
      type: [pasteSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
