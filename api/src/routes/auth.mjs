import { Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { registerSchema, loginSchema } from "../utils/authValidationSchema.mjs";
import passport from "passport";
import AuthModel from "../schemas/auth.mjs";

const router = Router();

router.post("/register", checkSchema(registerSchema), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .send({ errors: errors.array().map((err) => err.msg) });
  const data = matchedData(req);
  const newUser = new AuthModel(data);
  try {
    const savedUser = await newUser.save();
    if (!savedUser) throw new Error({ message: "Internal server error" });
    console.log("User registered successfully");
    return res.status(201).send({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
});

router.post(
  "/login",
  checkSchema(loginSchema),
  passport.authenticate("local"),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .send({ errors: errors.array().map((err) => err.msg) });
      if (req.isAuthenticated()) {
        console.log("User logged in successfully");
        return res.status(200).send({
          message: "User logged in successfully",
          user: req.user.username,
          id: req.user._id,
        });
      }
      return res.status(401).send({ message: "Invalid credentials" });
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  }
);

router.post("/logout", (req, res) => {
  if (req.isUnauthenticated()) {
    return res.status(401).send({ message: "User not logged in" });
  }
  req.logout((err) => {
    if (err) return res.status(500).send({ error: "Internal server error" });
    req.session.destroy((err) => {
      if (err) return res.status(500).send({ msg: "LOGOUT ERROR" });
    });
    res.clearCookie("connect.sid", { path: "/" });
    console.log("User logged out successfully");
    return res.status(200).send({ message: "User logged out successfully" });
  });
});

export default router;
