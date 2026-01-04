import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api/api";

const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    api
      .get(`/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const deleteReview = async (reviewId) => {
    try {
      setLoading(true);
      await api.delete(`/${id}/reviews/${reviewId}`);

      setListing((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r._id !== reviewId),
      }));

      toast.warning("Review deleted!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Reviews
      </h3>

      {listing?.reviews?.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          No reviews yet. Be the first to review!
        </p>
      )}

      <ul className="space-y-4">
        {listing?.reviews?.map((review) => (
          <li key={review._id}>
            <div
              className="
                p-6 rounded-xl shadow-md
                bg-white dark:bg-neutral-900
                border border-gray-200 dark:border-gray-800
              "
            >
              {/* HEADER */}
              <div className="flex items-center gap-4">
                <img
                  className="h-8 w-8 rounded-full ring-1 ring-sky-500 object-cover"
                  src={review.author.profile.url}
                  alt={review.author.username}
                />

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    {review.author.username}
                    <span className="text-yellow-500 text-sm">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toDateString()}
                  </p>
                </div>
              </div>

              {/* COMMENT */}
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {review.comment}
              </p>

              {/* ACTION */}
              {user && user.username === review.author.username && (
                <button
                  onClick={() => deleteReview(review._id)}
                  disabled={loading}
                  className="
                    mt-4 px-4 py-2 rounded-md text-sm font-medium
                    bg-red-600 text-white
                    hover:bg-red-700 transition
                    disabled:opacity-60
                  "
                >
                  {loading ? "Deleting..." : "Delete 🗑️"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
