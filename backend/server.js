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
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
//console.log("dirname", __dirname);
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

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

app.listen(PORT, () => {
  // console.log(`Server started on https://localhost:${PORT}`);
  connectDB();
});
