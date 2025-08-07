import passport from "passport";
import { Strategy } from "passport-local";
import Auth from "../schemas/auth.mjs";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await Auth.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const findUser = await Auth.findOne({ email });
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Invalid password");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
