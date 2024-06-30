import express from "express";
import { getUserProfileAndRepos } from "../controllers/userController.js";
import { ensureAuthenticated } from "../middleware/ensureauth.js";
import { likeProfile } from "../controllers/userController.js";
import { getLikes } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/profile/:username", getUserProfileAndRepos);

//TODO => GET LIKES (who liked our profile)
userRouter.get("/likes", ensureAuthenticated, getLikes);

//TODO => POST like a profile
userRouter.post("/like/:username", ensureAuthenticated, likeProfile);

export default userRouter;
