import React from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";

const Map = () => {
  const libraries = ["places"];

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyATC6dYyiirhaZ_DRtNvLfOMQpaxcObMw0",
    libraries,
  });

  if (loadError) {
    return "error loading maps";
  }
  if (!isLoaded) {
    return "loading maps";
  }

  const mapContainerStyle = {
    width: "800px",
    height: "400px",
  };

  const center = {lat: 0, lng: 0};

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={0}
        center={center}
      />
    </div>
  );
};

export default Map;
