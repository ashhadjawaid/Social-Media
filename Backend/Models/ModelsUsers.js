import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    maxlength: 50,
  },
  city: {
    type: String,
    maxlength: 50,
  },
  from: {
    type: String,
    maxlength: 50,
  },
  relationships: {
    type: Number,
    enum: [1, 2, 3],
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
