import mongoose, { Schema, models } from 'mongoose';

const topicSchema = new Schema(
  {
    title: String,
    topic: String,
    image: String,
    userId: {
      type: mongoose.Schema.ObjectId,
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
