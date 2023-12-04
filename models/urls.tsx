import mongoose, { Schema, models } from 'mongoose';

const urlSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    topic: {
      type: mongoose.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic must belong to a user'],
    },
  },
  { timestamps: true }
);
const Url = models.Url || mongoose.model('Url', urlSchema);
export default Url;
