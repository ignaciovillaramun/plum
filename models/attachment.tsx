import mongoose, { Schema, models } from 'mongoose';

const attachmentSchema = new Schema(
  {
    title: String,
    attachment: {
      type: String,
    },
    topic: {
      type: mongoose.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic must belong to a user'],
    },
  },
  { timestamps: true }
);
const Attachment =
  models.Attachment || mongoose.model('Attachment', attachmentSchema);
export default Attachment;
