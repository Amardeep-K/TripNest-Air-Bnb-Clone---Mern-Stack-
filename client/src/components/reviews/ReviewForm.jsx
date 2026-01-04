import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import "./starability.css";

const ReviewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        `/${id}/reviews`,
        { review: formData },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Review posted!");
      navigate(0); // refresh listing
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 mt-6"
    >
      {/* RATING */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Rating
        </label>

        {/* Starability CSS stays untouched */}
        <fieldset className="starability-grow">
          <input type="radio" id="rate1" name="rating" value="1" onChange={handleChange} />
          <label htmlFor="rate1" title="Terrible">1 star</label>

          <input type="radio" id="rate2" name="rating" value="2" onChange={handleChange} />
          <label htmlFor="rate2" title="Not good">2 stars</label>

          <input type="radio" id="rate3" name="rating" value="3" onChange={handleChange} />
          <label htmlFor="rate3" title="Average">3 stars</label>

          <input type="radio" id="rate4" name="rating" value="4" onChange={handleChange} />
          <label htmlFor="rate4" title="Very good">4 stars</label>

          <input type="radio" id="rate5" name="rating" value="5" onChange={handleChange} />
          <label htmlFor="rate5" title="Amazing">5 stars</label>
        </fieldset>
      </div>

      {/* COMMENT */}
      <div>
        <label
          htmlFor="reviewComment"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Comment
        </label>

        <textarea
          id="reviewComment"
          name="comment"
          rows="4"
          minLength={10}
          required
          onChange={handleChange}
          placeholder="Share your experience..."
          className="
            w-full p-3 rounded-md resize-none
            bg-white dark:bg-neutral-900
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-sky-500
            transition
          "
        />
      </div>

      {/* SUBMIT */}
      <div>
        <button
          type="submit"
          className="
            inline-flex items-center gap-2 mt-2
            px-4 py-2 rounded-md text-sm font-medium
            bg-sky-500 text-white
            hover:bg-sky-600
            transition shadow-md hover:shadow-lg
          "
        >
          <i className="fa-regular fa-paper-plane"></i>
          Post Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
