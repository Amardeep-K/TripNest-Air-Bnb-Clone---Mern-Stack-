import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { validationListingMiddleware ,validationReviewMiddleware } from "../middlewares/validate.js";
import { storage,InputFile } from "../config/appwrite.config.js";


export const  allListings = async (req, res) => {
  //  req.session.name="Amar";
    const listings = await Listing.find();
    res.json(listings);
  //  res.render("listings/index.ejs", {listings});
 }

export const createListingForm = async (req, res) => {
  
   res.render("listings/create.ejs");
 }
export const handleCreateListing = async (req, res) => {
  try {
   
       const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image required" });
    }
    const fileUpload = await storage.createFile(
            process.env.APPWRITE_BUCKET_ID,
            'unique()', // Let Appwrite generate an ID
            InputFile.fromBuffer(req.file.buffer, req.file.originalname)
        );
    const fileUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    // Extract fields directly from req.body (not nested)
    const {listing} = req.body;
    
    const newListing = new Listing({
      title: listing.title,
      image: {
        url: fileUrl,
        fileId: fileUpload.$id,
      },
      description: listing.description,
      price: listing.price, 
      location: listing.location,
      country: listing.country,
      admin:req.user._id

      
    });
    
    // if (req.file) {
    //   newListing.image = {
    //     filename: req.file.filename,
    //     url: req.file.path,
    //   };
    // }

    await newListing.save();
    console.log("New listing created:", newListing);
    
    res.status(201).json({
      success: true,
      message: "Listing created successfully!",
      listing: newListing,
    });
    
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({
      success: false,
      message: "Error creating listing",
      error: error.message,
    });
  }
};
  

 export const showListing = async (req, res) => {
     
    const listing = await Listing.findById(req.params.id).populate({
     path: "reviews",
     populate: {
       path:"author",
     },
    })
     .populate("admin").exec();
 
    if (!listing) {
       req.flash("error", "No listings found!");
       return res.redirect("/");
     } 
     
 
    res.json(listing);
   // res.render("listings/show.ejs", { listing });
 
 
  }

  export const editListingForm = async (req, res) => {
      const {id} = req.params;
      const listing = await Listing.findById(id);
    //   let originalUrl = listing.image.url;
    //  originalUrl= originalUrl.replace("/upload/", "/upload/w_600/");
    //  res.render("listings/edit.ejs", {listing, originalUrl});
    res.status(201).json({
      success: true,
      message: "Listing created successfully!", listing

    }
    );


  
  
   }
export const handleEditListing = async (req, res) => {
    const {id} = req.params;
    const fileUpload = await storage.createFile(
            process.env.APPWRITE_BUCKET_ID,
            'unique()', // Let Appwrite generate an ID
            InputFile.fromBuffer(req.file.buffer, req.file.originalname)
        );
    const fileUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
   
    const Elisting = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    console.log(req.file);
    if (req.file){ 
          Elisting.image = {
        url: fileUrl,
        fileId: fileUpload.$id,
      };}
          await Elisting.save();
    //  req.flash("edited", "Listing edited successfully!");
    res.json({ success: true, message: "Listing edited!" });

}
export const destroyListing = async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    // req.flash("deleted", "Listing deleted successfully!");
    res.json({ success: true, message: "Listing deleted!" });
   res.redirect("/");
}
