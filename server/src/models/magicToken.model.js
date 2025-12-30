import mongoose from "mongoose";

const magicTokenSchema = new mongoose.Schema({
  email: {type:String,
    unique:true

  },
  username:String,
  token: String,
  expiresAt: Date,
});

export default mongoose.model("MagicToken", magicTokenSchema);
