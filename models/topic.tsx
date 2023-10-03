import mongoose, { Schema, models } from 'mongoose';

const topicSchema = new Schema(
  {
    title: String,
    topic: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Topic = models.Topic || mongoose.model('Topic', topicSchema);
export default Topic;
