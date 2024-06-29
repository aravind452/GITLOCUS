import express from "express";
import userRouter from "./routes/userRoutes.js";
import exploreRouter from "./routes/exploreRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/explore", exploreRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
