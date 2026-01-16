import mongoose from "mongoose";
import { UserTypes } from "../types/user-types"; // correct path

// const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

// const userSchema = new mongoose.Schema<UserTypes>(
//   {
//     username: { type: String, required: true, trim: true },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 8,
//       match: passwordRegex,
//     },

//     experience: { type: Number, min: 0, required: true },

//     skills: { type: [String], required: true },

//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<UserTypes>("User", userSchema);
const userSchema = new mongoose.Schema<UserTypes>({
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // only requirement here
  },
  experience: { type: Number, min: 0, required: true },
  skills: { type: [String], required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<UserTypes>("User", userSchema);
