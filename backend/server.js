import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import messageRoutes from './routes/messageRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/messages', messageRoutes); // Mount message routes

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my Express server!' });
});

app.get('/sign-in', (req, res) => {
    res.json({ message: 'Not signed in! You need to sign in to access protected routes.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
