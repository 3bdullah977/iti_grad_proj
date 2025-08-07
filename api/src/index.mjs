import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import routes from "./routes/index.mjs";
import "./strategies/local-strategy.mjs";
import cors from "cors";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth", {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(
  session({
    secret: "abdullah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
