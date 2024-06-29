import express from "express";
import { explorePopularRepos } from "../controllers/exploreController.js";

const exploreRouter = express.Router();

exploreRouter.get("/repos/:language", explorePopularRepos);

export default exploreRouter;
