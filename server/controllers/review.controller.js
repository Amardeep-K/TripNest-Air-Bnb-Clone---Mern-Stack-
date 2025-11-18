import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
export const reviewSubmissionHandler = async (req, res) => {
     
      const { listingId } = req.params;
      const listing = await Listing.findById(listingId);
      const newReview = new Review(req.body.review); 
       
      newReview.author=req.user._id;
      await newReview.save();      
      listing.reviews.push(newReview);
     await listing.save();
     console.log("New review added:", newReview);
      res.status(200).json({ success: true, message: "Review added Successfully!" });

     
}

export const destroyReview =async (req, res) => {
    const { listingId, reviewId } = req.params; 
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
     res.status(200).json({ success: true, message: "Review Deleted! " });
}