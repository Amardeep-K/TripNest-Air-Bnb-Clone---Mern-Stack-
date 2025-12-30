
import { Listing } from "../models/listing.model.js";
import {Review} from "../models/review.model.js";
import { verifyToken } from "../helpers/jwt.js";
import { User } from "../models/user.model.js";


export const auth = async (req, res, next) => {
  try {
    // console.log("Verifying.... token")
    // console.log("Cookies received:", req.cookies); 
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
     console.log("User authenticated:", user.email);  
    next();

  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: "Authentication failed" });
  }
};



export const isLoggedIn = (req, res, next) => {
    
    // if(!req.isAuthenticated()){
       
    //     req.session.redirectUrl = req.originalUrl;
        
    //     req.flash('error', 'You must be signed in first!');
    //     return res.redirect('/authentication/login');
    // }  

  //   const token = req.cookies.jwt;
  //   if (!token) return res.status(401).json({ message: "Not authenticated" });

  //   const decoded = verifyToken(token);
  //   if (decoded) {
  //   return next();
  // }

  // return res.status(401).json({
  //   success: false,
  //   message: "You must be logged in",
  // });
    
}
export const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      user: null,
      message: "Not logged in",
    });
  }

  res.status(200).json({
    success: true,
    user: req.user,
  });
  console.log(req.user);
};


export const storeReturnTo = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
}
export const isCreater = async  (req, res, next) => {
    const {id} = req.params;
    const listing =   await Listing.findById(id);

    if(!listing.admin.equals(res.locals.currentUser._id)){
       req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/${id}`);
    }
    next();
}
export const isAuthor = async  (req, res, next) => {
    const {id , reviewId} = req.params;
    const review =   await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currentUser._id)){
      res.status(500).json("You are not authorised to perform this operation")
    }
    next();
}
