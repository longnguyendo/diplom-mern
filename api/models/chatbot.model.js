import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      content: String,
      role: String, // 'user' or 'assistant'
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
},{timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

