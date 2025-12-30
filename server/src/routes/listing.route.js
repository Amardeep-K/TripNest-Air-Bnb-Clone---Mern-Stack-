import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn , isCreater} from "../middlewares/authentication.js";
import { allListings, createListingForm, destroyListing, editListingForm, handleCreateListing, handleEditListing, showListing } from "../controllers/listing.controller.js";
import { validationListingMiddleware ,validationReviewMiddleware } from "../middlewares/validate.js";
import { upload } from "../config/multer.config.js";
import { auth } from "../middlewares/authentication.js";

export const listingRouter = express.Router();
// Route to get all listings
 listingRouter.get("/",allListings);

  // Create a route to handle form submission
 listingRouter.route("/create")

            // Render form to create a new listing
            .get(isLoggedIn, wrapAsync(createListingForm))

            // Handle form submission to create a new listing
            .post( auth, upload.single("listing[image]"),validationListingMiddleware, wrapAsync(handleCreateListing),(req,res)=>{
              if (!req.file) return res.status(400).send('No file uploaded.');
              console.log(req.file.path);
              res.json({ imageUrl: req.file.path });

            })
           


 // Route to show details of a specific listing
 listingRouter.route("/:id")

              // Show details of a specific listing
              .get(wrapAsync(showListing))

              // Route to handle the update form submission
              .put( auth, wrapAsync( handleEditListing))
              // upload.single("listing[image]")
              // isCreater,

                //Route to handle deletion
              .delete(auth, wrapAsync(destroyListing)); 
              // isLoggedIn,isCreater,



  // Render form to edit an existing listing
 listingRouter.get("/:id/edit",auth,  wrapAsync (editListingForm));
//   isCreater, 




 