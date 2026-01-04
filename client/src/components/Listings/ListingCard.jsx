import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ListingSkeleton from "../skeleton/ListingSkeleton";

const ListingCard = () => {
  const { getListing, loading, setLoading } = useAuth();
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await getListing();
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [getListing, setLoading]);

  if (loading) {
    return (
      <>
        {[...Array(6)].map((_, idx) => (
          <ListingSkeleton key={idx} />
        ))}
      </>
    );
  }

  return (
    <>
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="
            w-[25em] h-[25em] mb-7 rounded-xl overflow-hidden
            bg-white dark:bg-neutral-900
            shadow-md hover:shadow-xl transition
            border border-gray-200 dark:border-gray-800
            card
          "
        >
          {/* IMAGE */}
          <figure className="h-48 w-full overflow-hidden">
            <img
              src={listing?.image?.url}
              alt={listing.title}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </figure>

          {/* BODY */}
          <div className="card-body flex flex-col justify-center ">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-1">
              {listing.title}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {listing.description}
            </p>

            <div className="card-actions flex items-center justify-between">
              <span className="badge badge-info w-20 text-sm badge-outline"> ₹ {listing.price.toLocaleString("en-IN")} </span>

              <button
                onClick={() => navigate(`/${listing._id}`)}
                className="
                  px-4 py-2 rounded-full text-sm font-medium
                  bg-sky-500 text-white
                  hover:bg-sky-600
                  transition shadow-sm hover:shadow-md
                "
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
