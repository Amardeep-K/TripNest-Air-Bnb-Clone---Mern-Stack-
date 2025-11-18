import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// export const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// };

export const generateToken = (payload) => {
    console.log("generating token")
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  try {
    console.log("verifying  token ...")
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// export const sendTokenAsCookie = (res, token) => {
//      console.log("saving  token ..")
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
// };




