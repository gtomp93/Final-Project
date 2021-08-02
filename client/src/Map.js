import React, {useState} from "react";
import {
  GoogleMap,
  useLoadScript,
  withGoogleMap,
  Marker,
} from "@react-google-maps/api";
/* eslint-disable no-undef */

const mapContainerStyle = {
  width: "800px",
  height: "400px",
};
const center = {lat: 0, lng: 0};
const libraries = ["geometry"];

const RenderMap = ({clickedLat, clickedLng, mapClickHandler}) => {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={2}
      center={center}
      onClick={(ev) => {
        mapClickHandler(ev);
      }}
      // onLoad={onLoad}
    >
      {clickedLat && clickedLng && (
        <Marker position={{lat: clickedLat, lng: clickedLng}} />
      )}
    </GoogleMap>
  );
};

const Map = () => {
  const [clickedLat, setClickedLat] = useState(null);
  const [clickedLng, setClickedLng] = useState(null);
  //   <script
  //     async
  //     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATC6dYyiirhaZ_DRtNvLfOMQpaxcObMw0&libraries=geometry&callback=initMap"
  //   ></script>;

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

  // const mapContainerStyle = {
  //   width: "800px",
  //   height: "400px",
  // };
  // const center = {lat: 0, lng: 0};

  // let clickedLng = null;
  // let clickedLat = null
  let clickSpot = null;
  let distanceTest = null;
  let nyc = new google.maps.LatLng(40.715, -74.002);
  let london = new google.maps.LatLng(51.506, -0.119);

  const mapClickHandler = (ev) => {
    setTimeout(() => {
      clickSpot = ev.latLng;
      console.log(ev.latLng.lng(), "lng", ev.latLng.lat(), "lat");
      setClickedLng(ev.latLng.lng());
      setClickedLat(ev.latLng.lat());
      distanceTest = google.maps.geometry.spherical.computeDistanceBetween(
        nyc,
        clickSpot
      );
      console.log(distanceTest);
    }, 50);
  };

  console.log("london", london);
  //   if (google) {
  console.log(google);
  let distance = google.maps.geometry.spherical.computeDistanceBetween(
    nyc,
    london
  );
  // console.log("distance", distance);

  // const onLoad = (map) => {
  //   center = mapCenter;
  // };

  return (
    <div>
      <RenderMap
        clickedLat={clickedLat}
        clickedLng={clickedLng}
        mapClickHandler={mapClickHandler}
      />
    </div>
  );
};

export default Map;
