import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: string; // Recipient of the notification
  message: string; // Notification text
  courseId: string; // Optional: ID of the new course
  isSeen: boolean; // Whether the user has seen this notification
  createdAt: Date;
  thumbnail: String
}

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isSeen: { type: Boolean, default: false },
    thumbnail: { type: String, default:"abc.jpg" },
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
