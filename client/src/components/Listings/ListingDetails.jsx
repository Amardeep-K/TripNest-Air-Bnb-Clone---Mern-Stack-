import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "./widgets/BookingCard";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import ListingStickyHeader from "../widgets/ListingStickyHeader";
import Map from "../widgets/Map";

const ListingDetails = ({ listing, location }) => {
  const { user } = useAuth();
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteListing = async () => {
    setEditLoading(true);
    try {
      await api.delete(`/${listing._id}`);
      toast.success("Listing deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
      console.error(err);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <>
      <ListingStickyHeader />

      {/* TITLE */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {listing?.title}
        </h1>
      </div>

      {/* IMAGE GRID */}
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8">
        <div className="col-span-2 row-span-2">
          <img
            src={listing?.image?.url || listing?.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {[...Array(4)].map((_, i) => (
          <img
            key={i}
            src={listing?.image?.url}
            className="object-cover"
            alt=""
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT */}
        <div className="lg:w-2/3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            About this place
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {listing?.description}
          </p>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Amenities
          </h2>
          <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
            <li>✓ Wifi</li>
            <li>✓ Kitchen</li>
            <li>✓ Free parking</li>
            <li>✓ TV</li>
          </ul>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Location
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {listing?.country}
          </p>
        </div>

        {/* RIGHT */}
        <BookingCard />
      </div>

      {/* MAP */}
      <div className="mt-6 p-4 rounded-xl shadow-md bg-white dark:bg-neutral-900">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          You are here
        </h2>
        {location ? (
          <Map lat={location.lat} lng={location.lng} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        )}
      </div>

      {/* ACTIONS */}
      {user && user.email === listing?.admin?.email && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(`/${listing._id}/edit`)}
            className="px-4 py-2 rounded-md font-medium 
              bg-sky-500 text-white hover:bg-sky-600 transition"
          >
            Edit <i className="fa-solid fa-pencil"></i>
          </button>

          <button
            onClick={handleDeleteListing}
            disabled={editLoading}
            className="px-4 py-2 rounded-md font-medium 
              bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60"
          >
            {editLoading ? "Deleting..." : "Delete"}
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default ListingDetails;
