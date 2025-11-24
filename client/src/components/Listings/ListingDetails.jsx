import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BookingCard from "./widgets/BookingCard";
import api from "../../api/api";
import Gallery from "./widgets/Gallery";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import ListingStickyHeader from "../widgets/ListingStickyHeader";
import Map from "../widgets/Map";
import { geocode } from "../../api/GeocodingApi";


const ListingDetails = () => {
  const {user} = useAuth();
  const { id } = useParams(); // ✅ grab listing ID from URL
  const [listing, setListing] = useState(null);
  const [editLoading , setEditLoading]= useState(false);
 const[location,setLocation]=useState(null);

  const navigate = useNavigate();

  useEffect( () => {
    const fetchListing = async ()=>{
    try{
   const {data} = await api.get(`/${id}`) // ✅ fetch one listing
  
   setListing(data)
  
     const coordinates = await geocode(data.location);
     if(coordinates){
      
       setLocation({ lat: coordinates[1], lng: coordinates[0] });
     }

    }catch(err){
    console.error(err);
    }
  }
  fetchListing();

  }, [id]);


        

  const handleDeleteListing = async () => {
    setEditLoading(true);
  try {
    await api.delete(`/${listing._id}`);
         toast.success("Listing deleted successfully!");
    
    navigate("/");
    setEditLoading(false);
    // refresh reviews list or remove from state
  } catch (err) {
     toast.error(err.response.data.message); 

    console.error(err);
  }
  
};

  if (!listing) return <div><span className="loading loading-spinner loading-lg"></span></div>; // ✅ prevent undefined access

  return (
    <>
    <ListingStickyHeader/>
      {/* TITLE + META */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          {listing.title}
        </h1>
      
     
    </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8">
        <div className="col-span-2 row-span-2">
          <img
            src={listing.image?.url || listing.image}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <img src={listing.image?.url} className="object-cover rounded-xl" />
        <img src={listing.image?.url} className="object-cover rounded-xl" />
        <img src={listing.image?.url} className="object-cover rounded-xl" />
        <img src={listing.image?.url} className="object-cover rounded-xl" />
      </div>

      {/* HOST + DETAILS */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SECTION */}
        <div className="lg:w-2/3">
          <h2 className="text-xl font-semibold mb-2">About this place</h2>
          <p className="text-gray-300 leading-relaxed">
            {listing.description}
          </p>

           <div className="divider"></div>

          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul className="grid grid-cols-2 gap-2 text-gray-300">
            <li>✓ Wifi</li>
            <li>✓ Kitchen</li>
            <li>✓ Free parking</li>
            <li>✓ TV</li>
          </ul>

           <div className="divider"></div>

          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <p className="text-gray-300">{listing.country}</p>
        </div>

        {/* RIGHT SECTION: BOOKING CARD */}
        <BookingCard />
        
        <hr />
       
        
      </div>
      <div className=" flex flex-col gap-2  py-5 mt-5 shadow-xl  ">
        <h2 className="text-xl font-semibold"> You are here</h2>
        {location?
        <Map lat={location.lat} lng={location.lng} />
        :(<p> Loading....</p>)}
      </div>
       
    { user && user.email == listing?.admin?.email ? <div className="action-container flex gap-4 mt-4">
      <button
  onClick={() => navigate(`/${listing._id}/edit`)}
  className="bg-sky-500 rounded-sm px-3 py-2  text-black hover:cursor-pointer"
>
  Edit <i className="fa-solid fa-pencil"></i>
</button>
      <button
  onClick={handleDeleteListing}
  className="bg-black rounded-sm px-3 py-2 text-white hover:cursor-pointer"
  disabled={editLoading}
>{editLoading? "Deleting...": "Delete "}
  <i className="fa-solid fa-trash"></i>
</button>
</div>:null }
      
    </>
  );
};

export default ListingDetails;
