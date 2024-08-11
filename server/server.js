import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
dotenv.config();


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server listening on port ${PORT}`);
});
