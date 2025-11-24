import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";




mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
// console.log(mapboxgl)
// console.log("token:",mapboxgl.accessToken);

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  overflow: "hidden"
};

const Map = ({ lat, lng }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return; // prevent reinitializing map

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],   // Mapbox uses [lng, lat]
      zoom: 10
    });
    mapInstance.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Add Marker
    new mapboxgl.Marker({
      color: "#ff4757"
    })
      .setLngLat([lng, lat])
      .addTo(mapInstance.current);

    return () => mapInstance.current?.remove();
  }, [lat, lng]);

  return <div ref={mapContainer} style={containerStyle} />;
};

export default Map;
