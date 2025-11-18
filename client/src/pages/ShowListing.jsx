
import ListingDetails from '../components/Listings/ListingDetails'
import ReviewForm from '../components/reviews/ReviewForm';
import { useAuth } from '../context/AuthContext';
import {React,useEffect, useState} from "react";
import api from "../api/api";
import { MapPin, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import Reviews from '../components/reviews/Reviews';
const ShowListing = () => {
  const {user}= useAuth();
     const { id } = useParams(); // ✅ grab listing ID from URL
  const [listing, setListing] = useState(null);

  useEffect(() => {
    api
      .get(`/${id}`) // ✅ fetch one listing
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  if (!listing) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
        <ListingDetails/>
        {user?(<div className="divider"></div>):null}
         
         {
          user?(
            
        <div className="reviews-form max-w-full bg-gray-900  mx-auto p-6 shadow-lg rounded-lg">
  <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
    
        <div className="flex items-center gap-2 text-gray-400 mt-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{listing.rating || "4.9"}</span>
          <span>|</span>
          <span>{listing.reviews.length}</span>
          <span>|</span>
          <MapPin className="w-4 h-4" />
          <span>{listing.location}</span> |
          <span>{listing.country}</span>
        </div>
        <ReviewForm  />
        </div>
        ):null
        }
        
          <div className="divider"></div>
          <Reviews/>

      

     
    </div>
    
  );
};

export default ShowListing;
