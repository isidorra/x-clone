import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server listening on port ${PORT}`);
});