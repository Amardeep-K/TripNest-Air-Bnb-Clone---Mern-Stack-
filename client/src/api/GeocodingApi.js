import axios from "axios";


export const geocode =async (address)=>{
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}
`
const {data} =  await axios.get(url);


if (!data.features.length) {
    throw new Error("Location not found");
  }
const [long,lat]=data.features[0].center
return [long,lat]
}