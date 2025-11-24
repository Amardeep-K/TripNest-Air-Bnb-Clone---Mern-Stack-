import api from "../../../api/api";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";


const BookingCard = () => {
      const {user} = useAuth();
  const { id } = useParams(); // ✅ grab listing ID from URL
  const [listing, setListing] = useState(null);
  const [editLoading , setEditLoading]= useState(false);


  useEffect(() => {
    api
      .get(`/${id}`) // ✅ fetch one listing
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);
  return (
    
    <>
    <div className="lg:w-1/3">
          <div className="p-6 rounded-xl bg-gray-900 shadow-xl sticky bottom-0 sm:top-20">

            <h2 className="text-2xl font-semibold mb-3">
              ₹{listing?.price.toLocaleString("en-IN")}{" "}
              <span className="text-gray-400 text-sm">/ night</span>
            </h2>

            <button className="w-full mt-4 bg-sky-500 hover:bg-sky-600 transition-all px-4 py-3 rounded-lg font-semibold text-black">
              Reserve
            </button>
          </div>
        </div>
    </>
  )
}

export default BookingCard