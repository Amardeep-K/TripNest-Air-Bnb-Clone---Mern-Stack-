import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for magic link users
    provider: { type: String,
       enum: ["local", "google", "magic"],
        default: "local" }, // "local" | "google" | "magic"
    googleId: String,

    profile: {
      profilename: { type: String, default: "UserImage" },
      url: {
        type: String,
        default:
          "https://i.pinimg.com/736x/02/90/bb/0290bb1a6ab0fc2d3f5f0a6f05968f5e.jpg",
        set: (v) =>
          v === ""
            ? "https://i.pinimg.com/736x/02/90/bb/0290bb1a6ab0fc2d3f5f0a6f05968f5e.jpg"
            : v,
      },
    },
  },
  { timestamps: true }
);

// ✅ FIXED — use regular function
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

export const User = mongoose.model("User", userSchema);
