import mongoose, { Schema } from "mongoose";

// interface
interface IMessage {
    sender: mongoose.Types.ObjectId,
    receiver: mongoose.Types.ObjectId,
    text: string,
    isSeen: boolean,
    chat: mongoose.Schema.Types.ObjectId
}

// messageSchema
const messageSchema: Schema = new Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String
    },
    isSeen: {
        type: Boolean,
        default: false
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
});
const Message = mongoose.model<IMessage>("Message",messageSchema);
export default Message;
