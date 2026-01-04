import { useState ,useEffect } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

   const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: null, // This will hold the File object or the existing URL
    description: "",
    price: "",
    location: "",
    country: "",
  });

  // Fetch existing data
  useEffect(() => {
    api
      .get(`/${id}`)
      .then((res) => {
        const listing = res.data;
        setFormData({
          title: listing.title || "",
          image: listing.image?.url || null,
          description: listing.description || "",
          price: listing.price || "",
          location: listing.location || "",
          country: listing.country || "",
        });
        // Set initial preview to existing image URL if it exists
        if (listing.image?.url) setPreview(listing.image.url);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  // Memory cleanup for preview URLs
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      const selectedFile = files[0];
      if (!selectedFile) return;

      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error("Image must be under 2MB");
        return;
      }

      setFormData((prev) => ({ ...prev, image: selectedFile }));
      
      // Create new preview URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for multipart/form-data support
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
      const res = await api.put(`/${id}`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Listing updated successfully!");
      navigate(`/${id}`);
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="max-w-3xl mx-auto my-10 p-6  bg-white dark:bg-neutral-900 rounded-xl shadow-md">
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
            className="input input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
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
            className="textarea textarea-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
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
    cursor-pointer   file-input w-full p-0!  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
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
              className="input input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
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
              className="input input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
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
              className="input input-bordered w-full  bg-white dark:bg-neutral-900  border dark:border-base-300 border-gray-300"
              placeholder="Enter country"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-sky-500 hover:bg-sky-600 text-white dark:text-black border-none w-fit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditListing;
