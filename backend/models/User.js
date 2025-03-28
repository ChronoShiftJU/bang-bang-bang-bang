import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String },
    lastSignInAt: { type: Date }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
