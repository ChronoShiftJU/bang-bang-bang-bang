import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging Log

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
});

export default router;
