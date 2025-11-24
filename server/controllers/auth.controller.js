import bcrypt from "bcrypt";
import {User} from "../models/user.model.js";
import MagicToken from "../models/magicToken.model.js";
import { generateToken } from "../helpers/jwt.js";
import { sendEmail } from "../utils/SendEmail.js";
import crypto from "crypto";

// authproivded
// export const me = async (req, res) => {
//   return res.json({ user: req.user });
// };
 const cookieSettings = {
 httpOnly: true,
  secure: false,      // only true in production HTTPS
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",      
};

export const register = async (req, res) => {
  try {
    console.log(process.env.SERVER_URL);
    const { email, password ,username } = req.body;

    let existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
        username,
      password: hashed,
    });

    const token = generateToken({ id: user._id, email: user.email });

    res.cookie("jwt", token,cookieSettings);
    console.log("success registered:",user.username)
    return res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken({ id: user._id, email: user.email });

  res.cookie("jwt", token, cookieSettings);                              

  
console.log("success loggedeIn :",user.username)
  return res.json({ success: true, user });
};
export const me = async (req, res) => {
  console.log("your user at /me",req.user)
  return res.json({ user: req.user });
};


//Logged Out
export const logout = (req, res) => {
  res.clearCookie("jwt");
  console.log("Logged Out")
  res.json({ success: true });
};

// Magic Link 
// export const sendMagicLink = async (req, res) => {
//  try{ const { email , username } = req.body;

//   const token = crypto.randomBytes(32).toString("hex");

//   await MagicToken.create({
//     email,
//     username,
//     token,
//     expiresAt: Date.now() + 10 * 60 * 1000, // 10 mins
//   });

//   const link = `${process.env.CLIENT_URL}auth/magic/verify/${token}`;

//   await sendEmail(
//     email,
//     "Magic Login Link",
//       `<p>Click the link to login. This link is valid for 10 minutes.</p><a href="${link}">${link}</a>`
//   );

//   res.json({ message: "Magic link sent if email exists" });
// }catch (err) {
//     console.log("Error occured",err)
//     res.status(500).json({ message: err.message });
//   }
// };


// // Magic Link Verify
// export const verifyMagicLink = async (req, res, next) => {
//   try {
//     const { token } = req.params;

//     const record = await MagicToken.findOne({ token });
//     if (!record)
//       return res.status(400).json({ message: "Invalid token" });

//     if (record.expiresAt < Date.now())
//       return res.status(400).json({ message: "Link expired" });

//     let user = await User.findOne({ email: record.email });

//     if (!user) {
//       user = await User.create({
//         email: record.email,
//         username: record.username || "User",
//         provider: "magic",
//       });
//     }

//     const Token = generateToken({
//       id: user._id,
//       email: user.email,
//     });

//     res.cookie("jwt", Token, cookieSettings);

//     await MagicToken.deleteOne({ _id: record._id });

//     return res.json({
//       success: true,
//       message: "Logged in successfully",
//       user,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
