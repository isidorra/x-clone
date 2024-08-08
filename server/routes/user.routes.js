import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { follow, getUserInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:userId", protectRoute, getUserInfo);
router.post("/follow/:userToFollowId", protectRoute, follow);

export default router;