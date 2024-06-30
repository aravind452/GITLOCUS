import express from "express";
import userRouter from "./routes/userRoutes.js";
import exploreRouter from "./routes/exploreRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import "./passport/authentication.js";
import session from "express-session";
import passport from "passport";

dotenv.config();
const app = express();
// should be placed on the top
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/explore", exploreRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectDB();
});
