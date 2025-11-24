import { useEffect, useState } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";
const ListingStickyHeader = () => {
   const [showHeader, setShowHeader] = useState(false);
     const [listing, setListing] = useState(null);
   const {id}=useParams();
useEffect(() => {
    api
      .get(`/${id}`) // ✅ fetch one listing
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > 800) {
        
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 
        ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
      `}
    >
      <div className="bg-gray-900 text-white  text-sm  p-4 shadow-lg flex justify-between items-center">
       <div className="flex gap-4 items-center"> <span className="flex gap-2 items-center">  <i class="fa-solid fa-earth-americas"></i>  {listing?.location}</span> |  <span>{listing?.country}    </span> </div>
        <div className=" flex gap-4  justify-center items-center"> <h2 className=" text-xs sm:text-2xl font-semibold ">
              ₹{listing?.price.toLocaleString("en-IN")}{" "}
              <span className="text-gray-400 sm:text-sm">/ night</span>
            </h2>

            <button className=" w-fit sm:w-50  bg-sky-500 hover:bg-sky-600 transition-all py-1 px-3 sm:px-2 sm:py-2 rounded-sm sm:rounded-lg font-semibold text-black">
              Reserve
            </button> </div>
         
      </div>
    </div>
  );
};

export default ListingStickyHeader