import api from "../../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const BookingCard = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleReserve = () => {
    if (!user) {
      toast.info("Please login to reserve");
      return;
    }

    toast.success("Reservation feature coming soon 🚀");
  };

  return (
    <div className="lg:w-1/3">
      <div
        className="
          p-6 rounded-xl shadow-lg sticky top-24
          bg-white dark:bg-neutral-900
          border border-gray-200 dark:border-gray-800
        "
      >
        {/* PRICE */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
          ₹{listing?.price?.toLocaleString("en-IN")}
          <span className="ml-1 text-sm font-normal text-gray-600 dark:text-gray-400">
            / night
          </span>
        </h2>

        {/* CTA */}
        <button
          onClick={handleReserve}
          className="
            w-full mt-4 px-4 py-3 rounded-lg font-semibold
            bg-sky-500 text-white
            hover:bg-sky-600 transition
            shadow-md hover:shadow-lg
          "
        >
          Reserve
        </button>

        {/* AUTH HINT */}
        {!user && (
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            Login required to book
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
