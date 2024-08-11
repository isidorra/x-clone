import express from "express";
import { comment, create, deleteComment, deletePost, getAll, getAllByAuthorId, getFollowingPosts, like } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAll);
router.get("/user-posts/:userId", protectRoute, getAllByAuthorId);
router.get("/following-posts", protectRoute, getFollowingPosts);


router.post("/", protectRoute, create);
router.post("/comment", protectRoute, comment);

router.put("/like", protectRoute, like);
router.put("/delete-comment", protectRoute, deleteComment);

router.delete("/:postId", protectRoute, deletePost);



export default router;