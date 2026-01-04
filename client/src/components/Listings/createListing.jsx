import { useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

const CreateListing = () => {
  const navigate = useNavigate();
  const [preview,setPreview]=useState(null)
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    price: "",
    location: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      const selectedFile = files[0];
      setFormData({ ...formData, image: selectedFile });

      // Create a temporary URL for the preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        image: formData.image,
      },
    };

    try {
      const res = await api.post("/create", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Listing created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6   bg-white dark:bg-neutral-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6">Create a Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text text-lg">Title</span>
          </label>
          <input
            type="text"
            name="title"
            className="input validator input-bordered w-full bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300 "
            placeholder="Enter listing title"
            required
            minLength={5}
            value={formData.title}
            onChange={handleChange}
          />
          <div className="validator-hint hidden">Enter valid Title</div>
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text text-lg">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea validator textarea-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
            placeholder="Describe your listing"
            required
            rows="4"
            minLength={10}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <div className="validator-hint hidden">Enter valid Description</div>
        </div>

        {/* Image + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text text-lg">Image </span>
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="my-2 h-40 w-40 rounded-lg object-cover"
              />
            )}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="file:h-full! file:py-2 file:px-3 
              file:border-0
              file:text-sm 
              file:bg-sky-500 dark:file:text-black
              hover:file:bg-sky-600
              cursor-pointer   file-input w-full p-0! 
              bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
                        accept="image/*"
              required
              title="Must be valid URL"
            />
             

            <label className="label text-sm">Max size 2MB</label>
            <p className="validator-hint hidden">Limit Exceeded</p>
          </div>
          

          <div>
            <label className="label">
              <span className="label-text text-lg">Price (₹)</span>
            </label>
            <input
              type="number"
              name="price"
              className="input validator input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
              placeholder="Enter price"
              min="1"
              max="100000"
              required
              value={formData.price}
              onChange={handleChange}
            />
            <p className="validator-hint hidden">
              Must be between be ₹1 to ₹100000
            </p>
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
              className="input validator input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
              placeholder="City, State"
              required
              min={3}
              value={formData.location}
              onChange={handleChange}
            />
            <p className="validator-hint hidden"> Enter valid Location</p>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-lg">Country</span>
            </label>
            <input
              type="text"
              name="country"
              className="input input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
              placeholder="Enter country"
              required
              value={formData.country}
              onChange={handleChange}
            />
            <p className="validator-hint hidden">Enter Country Name</p>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-sky-500 hover:bg-sky-600 dark:text-black w-fit border-none"
        >
          ADD +
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
