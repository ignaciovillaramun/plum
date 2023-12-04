import mongoose, { Schema, models } from 'mongoose';

const topicSchema = new Schema(
  {
    title: String,
    image: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must belong to a user'],
    },
  },
  {
    timestamps: true,
  }
);

const Topic = models.Topic || mongoose.model('Topic', topicSchema);
export default Topic;
