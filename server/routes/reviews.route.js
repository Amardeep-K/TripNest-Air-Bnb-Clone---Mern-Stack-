import { Router } from "express";
import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { validationReviewMiddleware } from "../middlewares/validate.js";
import { destroyReview, reviewSubmissionHandler } from "../controllers/review.controller.js";

import { auth, isAuthor, isLoggedIn } from "../middlewares/authentication.js";
export const reviewRouter = Router({mergeParams: true});
reviewRouter.post("/",auth, validationReviewMiddleware,  wrapAsync(reviewSubmissionHandler),()=>{
    console.log("______ Start_____")
    console.log(req.jwt)

});
// 
// Delete review route
reviewRouter.delete("/:reviewId",  auth, wrapAsync(destroyReview));
