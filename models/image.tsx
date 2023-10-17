import mongoose, { Schema, models } from 'mongoose';

const imageSchema = new Schema(
  {
    title: String,
    image: {
      type: String,
    },
    description: String,
    topic: {
      type: mongoose.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic must belong to a user'],
    },
  },
  { timestamps: true }
);
const Image = models.Image || mongoose.model('Image', imageSchema);
export default Image;
