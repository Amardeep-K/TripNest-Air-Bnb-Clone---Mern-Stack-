
import ListingDetails from '../components/Listings/ListingDetails'
import { useAuth } from '../context/AuthContext';
import {React,useEffect, useState} from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import Reviews from '../components/reviews/Reviews';
import { toast } from 'react-toastify';
import ReviewWidget from "../components/Listings/widgets/ReviewWidget"
import ListingDetailsSkeleton from '@/components/skeleton/ListingDetailsSkeleton';
import { geocode } from '@/api/GeocodingApi';
const ShowListing = () => {
  const {user,loading,setLoading,showListing}= useAuth();
     const { id } = useParams(); // ✅ grab listing ID from URL
  const [listing, setListing] = useState(null);
   const[location,setLocation]=useState(null);

  useEffect(() => {
    const fetch =async()=>{
      try{
         setLoading(true)
      const response = await showListing(id);
      setListing(response.data)
      const coordinates = await geocode(response.data.location);
     if(coordinates){
      
       setLocation({ lat: coordinates[1], lng: coordinates[0] });
     }
      }catch(error){
        toast.error("Failed to fetch data");
      }finally{
         setLoading(false)

      }
    }
  fetch();
  }, [id]);
  


  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
      {loading?(<ListingDetailsSkeleton />):(<>
        <ListingDetails listing={listing} location={location}/>
        {user?(<div className="divider"></div>):null}
         
         {
          user?(
            <ReviewWidget listing={listing}/>
            
        
        ):null
        }
        
          <div className="divider"></div>
          <Reviews/>
          </>)}

      

     
    </div>
    
  );
};

export default ShowListing;
