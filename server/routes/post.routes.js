import express from "express";
import { create, deletePost, getAllByAuthorId } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, create);
router.delete("/:postId", protectRoute, deletePost);
router.get("/user-posts/:userId", protectRoute, getAllByAuthorId);

export default router;