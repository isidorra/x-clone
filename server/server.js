import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts/", postRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server listening on port ${PORT}`);
});
