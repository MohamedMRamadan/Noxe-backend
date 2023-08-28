import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Too short"],
    maxLength: [30, "Too long"],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Too short"],
    maxLength: [30, "Too long"],
    trim: true,
  },
  age: {
    type: Number,
    min: [18, "underage"],
    require: true,
  },
  email: {
    type: String,
    required: true,
    trime: true,
    unique: [true, "the email should be unique"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Too short"],
    match: [
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/,
      "Invalid Password",
    ],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  code: String,
  statue: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
