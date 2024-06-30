import express from "express";
import { ensureAuthenticated } from "../middleware/ensureauth.js";
import { explorePopularRepos } from "../controllers/exploreController.js";

const exploreRouter = express.Router();

exploreRouter.get("/repos/:language", explorePopularRepos);

export default exploreRouter;
