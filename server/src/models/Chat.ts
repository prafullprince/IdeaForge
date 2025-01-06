import mongoose, { Schema } from "mongoose";

// interface
interface IChat {
    user: mongoose.Types.ObjectId,
    message: mongoose.Types.ObjectId[],
}

// chatSchema
const chatSchema: Schema = new Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
},{timestamps:true});
const Chat = mongoose.model<IChat>("Chat",chatSchema);
export default Chat;
