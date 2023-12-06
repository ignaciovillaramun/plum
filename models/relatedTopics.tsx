import mongoose, { Schema, models } from 'mongoose';

const relatedTopicSchema = new Schema(
  {
    title: String,
    image: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User must belong to a user'],
    },
    topicId: {
      type: mongoose.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'User must belong to a user'],
    },
    parentTopic: {
      type: mongoose.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'User must belong to a user'],
    },
  },
  {
    timestamps: true,
  }
);

const Related = models.Related || mongoose.model('Related', relatedTopicSchema);
export default Related;
