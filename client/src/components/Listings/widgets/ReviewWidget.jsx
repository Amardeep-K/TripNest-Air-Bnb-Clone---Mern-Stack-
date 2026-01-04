import React from "react";
import { MapPin, Star } from "lucide-react";
import ReviewForm from "@/components/reviews/ReviewForm";

const ReviewWidget = ({ listing }) => {
  return (
    <div
      className="
        max-w-full mx-auto p-6 rounded-xl shadow-md
        bg-white dark:bg-neutral-900
        border border-gray-200 dark:border-gray-800
      "
    >
      {/* TITLE */}
      <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Leave a Review
      </h3>

      {/* META */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Star className="w-4 h-4 text-yellow-400" />
        <span>{listing?.rating || "4.9"}</span>

        <span className="mx-1">•</span>

        <span>{listing?.reviews?.length || 0} reviews</span>

        <span className="mx-1">•</span>

        <MapPin className="w-4 h-4" />
        <span>{listing?.location}</span>

        <span className="mx-1">•</span>

        <span>{listing?.country}</span>
      </div>

      {/* FORM */}
      <ReviewForm />
    </div>
  );
};

export default ReviewWidget;
