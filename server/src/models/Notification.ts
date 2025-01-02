import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: string; // Recipient of the notification
  message: string; // Notification text
  courseId: string; // Optional: ID of the new course
  isSeen: boolean; // Whether the user has seen this notification
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isSeen: { type: Boolean, default: false },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: Date.now() + 4 * 24 * 60 * 60 * 1000
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
export default Notification;
