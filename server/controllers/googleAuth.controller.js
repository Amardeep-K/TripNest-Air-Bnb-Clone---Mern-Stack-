  import { OAuth2Client } from "google-auth-library";
  import { User } from "../models/user.model.js";
  import { generateToken } from "../helpers/jwt.js";

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.SERVER_URL}/auth/google/callback`
  );


  export const googleAuth = (req, res) => {
    const redirectUrl = client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "profile",
        "email"
      ],
      redirect_uri: `${process.env.SERVER_URL}/auth/google/callback`,
    });

    res.redirect(redirectUrl);
  };

  export const googleCallback = async (req, res) => {
    try {
      const code = req.query.code;

      const { tokens } = await client.getToken({
        code,
        redirect_uri: `${process.env.SERVER_URL}/auth/google/callback`,
      });

      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      let user = await User.findOne({ email: payload.email });

      if (!user) {
        user = await User.create({
          email: payload.email,
          username: payload.name,
          provider: "google",
          googleId: payload.sub,
          profile: {
        profilename: payload.name,
        url: payload.picture
      }
        });
      }
        else {
    // update google info if exists
    user.username = payload.name;
    user.profile.url = payload.picture;
    await user.save();
  }
      

      const jwtToken = generateToken({ id: user._id, email: user.email });

      res.cookie("jwt", jwtToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } 
    catch (err) {
      console.log("GOOGLE LOGIN ERROR:", err);
      res.redirect(`${process.env.CLIENT_URL}/auth/login`);
    }
  };
