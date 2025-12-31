import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "@/context/AuthContext";
import ListingSkeleton from "../skeleton/ListingSkeleton";

const ListingCard = () => {
  const{getListing}=useAuth();
   const {loading,setLoading}= useAuth();
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {

    const fetch = async()=>{
      try{
        setLoading(true)
      const response = await getListing();
      console.log("Response:",response)
      setListings(response.data)
      
      }catch(error){
        console.log("Error",error);
      }finally{
        setLoading(false)
      }
    }
    fetch();
    
      
  }, [getListing,setLoading]);

  return (
    <>
      {loading && ([...Array(6)].map((_,idx)=>(<ListingSkeleton key={idx}/>)))}
      {listings.map((listing) => (
        <div key={listing._id} className="card bg-gray-900 h-[25em] w-[25em] mb-7 shadow-lg">
          <figure>
            <img
              className=" h-50 w-full object-cover"
              src={listing.image.url}
              alt={listing.title}
            />
          </figure>

          <div className="card-body flex flex-col justify-center items-">
            <h2 className="card-title font-medium text-2lg">
              {listing.title}
              
            </h2>

            <p className="font-lighter text-gray-400 text-justify">{listing.description}</p>

            <div className="card-actions flex items-center justify-between">
              <span className="badge badge-info w-20  text-sm  badge-outline">
                ₹ {listing.price.toLocaleString("en-IN")}
              </span>
              <button
                onClick={() => navigate(`/${listing._id}`)}
                className="btn rounded-full font-medium  text-sm bg-sky-500 text-black hover:bg-sky-600 hover:shadow-lg"
              >
                Book Now
              </button>
              
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListingCard;
