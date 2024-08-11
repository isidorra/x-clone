import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { follow, getRandomUsersNotFollowing, getUserInfo, search } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:userId", protectRoute, getUserInfo);
router.post("/follow", protectRoute, follow);
router.get("/follow/suggestions", protectRoute, getRandomUsersNotFollowing);
router.get("/search/:searchQuery", protectRoute, search);

export default router;