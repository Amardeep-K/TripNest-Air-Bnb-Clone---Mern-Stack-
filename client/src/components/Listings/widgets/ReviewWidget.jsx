import React from 'react'
import { MapPin, Star } from "lucide-react";
import ReviewForm from '@/components/reviews/ReviewForm';
const ReviewWidget = ({listing}) => {
  return (
   <>
   <div className="reviews-form max-w-full bg-gray-900  mx-auto p-6 shadow-lg rounded-lg">
  <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
    
        <div className="flex items-center gap-2 text-gray-400 mt-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{listing?.rating || "4.9"}</span>
          <span>|</span>
          <span>{listing?.reviews.length}</span>
          <span>|</span>
          <MapPin className="w-4 h-4" />
          <span>{listing?.location}</span> |
          <span>{listing?.country}</span>
        </div>
        <ReviewForm  />
        </div>
   </>
  )
}

export default ReviewWidget