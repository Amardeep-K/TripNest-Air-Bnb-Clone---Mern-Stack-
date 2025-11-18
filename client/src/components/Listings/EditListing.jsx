import { useState ,useEffect } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    
   
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });
   useEffect(() => {
    api
      .get(`/${id}`)
        .then((res) => {
            const listing = res.data;
        setFormData({
            title: listing.title,
            image: listing.image?.url || " ",
            description: listing.description,
            price: listing.price,
            location: listing.location,
            country: listing.country,
        })})
      .catch((err) => console.error(err));
      
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      listing: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        country: formData.country,
        image: { url: formData.image },
      },
    };

    try {
      const res = await api.put(`/${id}`, payload, {
        withCredentials: true,
      });

      toast.info(res.data.message || "Listing Edit successfully!");
      navigate(`/${id}`);

    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6">Update a Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text text-lg">Title</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Enter listing title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text text-lg">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Describe your listing"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text text-lg">Image URL</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-lg">Price (₹)</span>
            </label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              placeholder="Enter price"
              required
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location + Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text text-lg">Location</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              placeholder="City, State"
              required
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-lg">Country</span>
            </label>
            <input
              type="text"
              name="country"
              className="input input-bordered w-full"
              placeholder="Enter country"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-sky-500 hover:bg-sky-600 text-black w-fit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditListing;
