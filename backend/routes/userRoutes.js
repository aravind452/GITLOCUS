import express from "express";
import { getUserProfileAndRepos } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/profile/:username", getUserProfileAndRepos);

//TODO => GET LIKES (who liked our profile)

//TODO => POST like a profile

export default userRouter;
