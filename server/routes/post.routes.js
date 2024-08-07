import express from "express";
import { create } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, create);

export default router;