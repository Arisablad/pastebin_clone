import mongoose from 'mongoose';
import { pasteSchema } from './PasteModel';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 30,
  },
  googleId: {
    type: String,
  },
  pastes: {
    type: [pasteSchema],
    default: [],
  },
});

export const User = mongoose.model('User', userSchema);
