import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
    try {
        // Fetch all messages sorted by timestamp in ascending order
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const postMessage = async (req, res) => {
    try {
        const { userId, userName, userImage, text } = req.body;
        
        // Validate required fields
        if (!userId || !userName || !text) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const message = new Message({
            userId,
            userName,
            userImage,
            text,
            timestamp: Date.now()
        });

        await message.save();
        res.status(201).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
