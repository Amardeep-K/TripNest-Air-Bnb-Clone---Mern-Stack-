import {React,useState,useEffect} from 'react'
 import api from "./api/api";

const Listing = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get("/")
      .then((res) => setListings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="listings">
      <h2>All Listings</h2>
      <div className="grid">
        {listings.map((listing) => (
          <div key={listing._id} className="card">
            <h3>{listing.title}</h3>
            <p>{listing.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Listing;