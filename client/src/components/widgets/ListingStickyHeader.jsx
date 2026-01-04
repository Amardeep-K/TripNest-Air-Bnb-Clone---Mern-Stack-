import { useEffect, useState } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";

const ListingStickyHeader = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [listing, setListing] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/${id}`)
      .then((res) => setListing(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed h-fit bg-sky-500 bottom-0 left-0 sm:top-0 sm:left-0 w-full transition-all duration-300 z-9
       ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
      `}
    >
      <div
        className="
          flex justify-between items-center gap-4
          p-4 shadow-lg
          bg-white dark:bg-neutral-900
          border-t sm:border-b border-gray-200 dark:border-gray-800
        "
      >
        {/* LOCATION */}
        <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-earth-americas text-sky-500"></i>
            {listing?.location}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>{listing?.country}</span>
        </div>

        {/* PRICE + CTA */}
        <div className="flex items-center gap-4">
          <h2 className="text-sm sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            ₹{listing?.price?.toLocaleString("en-IN")}
            <span className="ml-1 text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-400">
              / night
            </span>
          </h2>

          <button
            className="
              px-3 py-1.5 sm:px-4 sm:py-2 rounded-md
              font-semibold text-sm
              bg-sky-500 text-white
              hover:bg-sky-600 transition
              shadow-md hover:shadow-lg
            "
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStickyHeader;
