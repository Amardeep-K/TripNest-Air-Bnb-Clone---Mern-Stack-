import {useState,useEffect}from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';
import './starability.css'
const ReviewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log([e.target.name],":",e.target.value)
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(formData);

    try {
      const res = await api.post(`/${id}/reviews`, { review:formData }, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Review posted!");
      // navigate(`/${id}`);
      navigate(0);  
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div>
        <form className="grid grid-cols-1 gap-4 " onSubmit={handleSubmit} method="POST">
    <div>
      <label className="block text-sm font-medium text-gray-400 mt-2 mb-2">Rating:</label>
      <fieldset className="starability-grow  ">
   <input  className="validate" type="radio" id="first-rate1" name="rating" value="1" onChange={handleChange} />
  <label htmlFor="first-rate1" title="Terrible">1 star</label>
  <input type="radio" id="first-rate2" name="rating" value="2" onChange={handleChange} />
  <label htmlFor="first-rate2" title="Not good">2 stars</label>
  <input type="radio" id="first-rate3" name="rating" value="3" onChange={handleChange} />
  <label htmlFor="first-rate3" title="Average">3 stars</label>
  <input type="radio" id="first-rate4" name="rating" value="4" onChange={handleChange} />
  <label htmlFor="first-rate4" title="Very good">4 stars</label>
  <input type="radio" id="first-rate5" name="rating" value="5" onChange={handleChange} />
  <label htmlFor="first-rate5" title="Amazing">5 stars</label>


</fieldset>
 <p className="validator-hint hidden">Please enter a comment.</p>
</div>
    <div>
      <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-400">Comment</label>
      <textarea onChange={handleChange} id="reviewComment" name="comment" className=" validator w-full shadow-[inset_0_2px_6px_rgba(2,0,0,0.65)] p-3 focus:border-sky-500 focus:border-2 rounded" rows="4" minLength={10} 
        placeholder="Share you experience..." required></textarea>
      <p className="validator-hint hidden">Please enter a comment.</p>
    </div>

    
    <div>
      <button type="submit"
        className="inline-flex cursor-pointer mt-4 items-center gap-2 bg-sky-500 text-black font-medium shadow-lg px-4 py-2 rounded-md hover:bg-sky-600 transition">
        <i className="fa-regular fa-paper-plane"></i>Post Review
      </button>
     
    </div>

  </form>

    </div>
  )
}

export default ReviewForm