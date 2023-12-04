import mongoose, { Schema, models } from 'mongoose';

const noteSchema = new Schema(
  {
    title: String,
    description: String,
    topic: {
      type: mongoose.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic must belong to a user'],
    },
  },
  { timestamps: true }
);
const Note = models.Note || mongoose.model('Note', noteSchema);
export default Note;
