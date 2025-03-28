import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userImage: { type: String }, // Optional
    text: { type: String, required: true },
    timestamp: { type: Number, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
