import React from "react";
import {GoogleMap, useLoadScript, withGoogleMap} from "@react-google-maps/api";
/* eslint-disable no-undef */

const Map = () => {
  const libraries = ["geometry"];

  //   <script
  //     async
  //     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATC6dYyiirhaZ_DRtNvLfOMQpaxcObMw0&libraries=geometry&callback=initMap"
  //   ></script>;

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyATC6dYyiirhaZ_DRtNvLfOMQpaxcObMw0",
    libraries,
  });

  //   console.log("distance", distance);

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

  var nyc = new google.maps.LatLng(40.715, -74.002);
  var london = new google.maps.LatLng(51.506, -0.119);

  //   if (google) {
  console.log("what");
  console.log(google);
  var distance = google.maps.geometry.spherical.computeDistanceBetween(
    nyc,
    london
  );
  console.log("distance", distance);
  // let distance =
  //   new window.google.maps.geometry.spherical.computeDistanceBetween(
  //     {lat: 23.0203, lng: 72.5562},
  //     {lat: -23.0436503, lng: 50.3}
  //   );
  //   }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={0}
        center={center}
        onClick={(ev) => {
          console.log("ev", ev);
          console.log(ev.latLng.lng(), "lng", ev.latLng.lat(), "lat");
        }}
      />
    </div>
  );
};

export default Map;
