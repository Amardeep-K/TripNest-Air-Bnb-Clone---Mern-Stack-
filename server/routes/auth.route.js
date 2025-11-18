import express from "express";
import { googleAuth,googleCallback } from "../controllers/googleAuth.controller.js";
import { me } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/authentication.js";
import {
  register,
  login,logout,
  
} from "../controllers/auth.controller.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const authRouter = express.Router();
authRouter.get("/me", auth, me);

authRouter.post("/register", wrapAsync(register));
authRouter.post("/login", wrapAsync(login));
authRouter.get('/logout',wrapAsync(logout));

// authRouter.post("/magic/send", wrapAsync(sendMagicLink));
// authRouter.get("/magic/verify/:token", wrapAsync(verifyMagicLink));
authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleCallback);


export default authRouter;
