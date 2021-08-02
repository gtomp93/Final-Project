import React, {useState, useContext} from "react";
import {MapContext} from "./MapContext";
import {
  GoogleMap,
  useLoadScript,
  withGoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";
/* eslint-disable no-undef */

const mapContainerStyle = {
  width: "800px",
  height: "400px",
};
const libraries = ["geometry"];
const zoom = 2;

// const center = {lat: 0, lng: 0};

const RenderMap = ({
  clickedLat,
  clickedLng,
  mapClickHandler,
  midpoint,
  nyc,
  center,
  line,
  midpointLat,
  midpointLng,
}) => {
  if (midpoint) {
    console.log("midpoint", midpoint.lat(), midpoint.lng());
  }

  // const {center, recenter} = useContext(MapContext);
  const lineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
      onClick={(ev) => {
        mapClickHandler(ev);
      }}
      // onLoad={onLoad}
    >
      {clickedLat && clickedLng && (
        <>
          <Marker position={{lat: clickedLat, lng: clickedLng}} />
          {midpoint && (
            <Marker
              position={{lat: midpoint.lat(), lng: midpoint.lng()}}
            ></Marker>
          )}
          {nyc && <Marker position={{lat: nyc.lat(), lng: nyc.lng()}}></Marker>}
        </>
      )}
      {line && (
        <Polyline
          path={[{lat: clickedLat, lng: clickedLng}, nyc]}
          options={lineOptions}
        ></Polyline>
      )}
    </GoogleMap>
  );
};

const Map = () => {
  const [clickedLat, setClickedLat] = useState(null);
  const [clickedLng, setClickedLng] = useState(null);
  const [midpointLat, setMidpointLat] = useState(null);
  const [midpointLng, setMidpointLng] = useState(null);
  const [midpoint, setMidpoint] = useState(null);
  const [line, setLine] = useState(false);
  const path = [];
  const {center, recenter} = useContext(MapContext);

  // const drawLine = (clickSpot, answer) => {
  //   // const Line = new google.map.PolyLine({
  //     path = [midpoint, nyc],

  //   // });
  // }
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
  // let midpointLat = null;
  // let midpointLng = null;
  // let midpoint = null;

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
      let midpointLat = (ev.latLng.lat() + 40.715) / 2;
      let midpointLng = (ev.latLng.lng() - 74.002) / 2;
      setMidpoint(new google.maps.LatLng(midpointLat, midpointLng));

      console.log("midpoint", midpoint);
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

  return (
    <div>
      <RenderMap
        clickedLat={clickedLat}
        clickedLng={clickedLng}
        mapClickHandler={mapClickHandler}
        midpoint={midpoint}
        nyc={nyc}
        center={center}
        line={line}
        // midpointLng={midpointLng}
        // midpointLat={midpointLat}
      />
      <button
        onClick={() => {
          recenter(midpoint.lat(), midpoint.lng());
          setLine(true);
        }}
      >
        guess
      </button>
    </div>
  );
};

export default Map;
