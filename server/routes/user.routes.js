import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { follow, getRandomUsersNotFollowing, getUserInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:userId", protectRoute, getUserInfo);
router.post("/follow/:userToFollowId", protectRoute, follow);
router.get("/follow/suggestions", protectRoute, getRandomUsersNotFollowing);

export default router;