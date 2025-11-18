import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; 
import { toast } from 'react-toastify';
import api from '../../api/api';
const Reviews = () => {
  const [Loading,setLoading]=useState(false);
    const {id}=useParams();
    const {user}=useAuth();
      const [listing, setListing] = useState(null);
      

  useEffect(() => {
    
    api
      .get(`/${id}`) // ✅ fetch one listing
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);
 const deleteReview = async (reviewId) => {
  try {
    setLoading(true);
    await api.delete(`/${id}/reviews/${reviewId}`);

   
    
    // safe state update
    setListing(listing => ({
      ...listing,
      reviews: listing.reviews.filter((r) => r._id !== reviewId)
    }));
    setLoading(false);
     toast.warning("Review deleted!");


  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="reviews-form max-w-full mx-auto   rounded-lg">
  <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

  {listing?.reviews?.length === 0 && (
    <h5 className="text-white">No reviews yet. Be the first to review!</h5>
  )}

  <ul>
    {listing?.reviews?.map((review) => (
      <li key={review._id}>
        <div className="card-body mt-4 bg-gray-900   p-6 rounded-lg shadow-lg">
          <div className='flex gap-5  '>
          <img className='h-8 rounded-full ring-1 ring-sky-500' src={review.author.profile.url} alt="" />
          <h4 className="flex items-center gap-2 text-lg font-semibold">
            {review.author.username}


            {/* Render stars / rating */}
            <span className="text-yellow-500">{`⭐`.repeat(review.rating)}</span>
            {/* <p class="starability-result" data-rating={review.rating}></p> */}
          </h4>
          </div>

          <p className="card-text mt-2">{review.comment}</p>

          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toDateString()}
          </p>

          {/* Only show delete button to owner */}
        
         {user && (user.username === review.author.username) ? <button
              onClick={() => deleteReview(review._id)}
              className=" w-fit bg-black rounded-lg px-3 py-2 text-white mt-3" disabled={Loading}
            >
             {Loading? "Deleting...": "Delete "}<i className="fa-solid fa-trash"></i>
            </button> : null }
            
          
        </div>
      </li>
    ))}
  </ul>
</div>
  )
}

export default Reviews