require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());  // Parse JSON request body
app.use(cors());          // Enable CORS

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my Express server!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});