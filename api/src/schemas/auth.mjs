import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
