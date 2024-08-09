import express from "express";
import { create, deletePost, getAll, getAllByAuthorId, like } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAll);
router.get("/user-posts/:userId", protectRoute, getAllByAuthorId);


router.post("/", protectRoute, create);
router.put("/like", protectRoute, like);

router.delete("/:postId", protectRoute, deletePost);


export default router;