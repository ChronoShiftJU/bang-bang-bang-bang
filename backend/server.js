import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import connectDB from "./models/Mongodb.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
