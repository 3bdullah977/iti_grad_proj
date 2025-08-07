import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    unique: true,
    required: true,
  },
  id: {
    type: [Number],
    default: [],
  },
});

const UserData = mongoose.model("UserData", UserDataSchema);
export default UserData;
