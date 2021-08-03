import React, {useState, useContext, Component} from "react";
import {MapContext} from "./MapContext";
import styled from "styled-components";

import {
  GoogleMap,
  useLoadScript,
  withGoogleMap,
  Marker,
  Polyline,
  StreetViewPanorama,
} from "@react-google-maps/api";
/* eslint-disable no-undef */

const mapContainerStyle = {
  // width: "80vw",
  // height: "500px",
  // width: "38%",
  aspectRatio: "9/5",
  // position: "absolute",
  // bottom: "0",
  // right: "0",
  // zIndex: "500",
};

const streetViewStyle = {
  width: "100%",
  aspectRatio: "9/5",
  // position: "absolute",
  // top: "23px",
  // right: "0",
};

const options = {
  // setClickable: false,
};

const locations = [
  {lat: 48.5245856, lng: -64.2058584},
  {lat: -22.9468822, lng: -43.1982841},
];

const streetViewOptions = {
  disableDefaultUI: true,
  enableCloseButton: false,
  showRoadLabels: false,
};

const libraries = ["geometry"];

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
  geodesic: false,
};

const Map = () => {
  const [clickedLat, setClickedLat] = useState(null);
  const [clickedLng, setClickedLng] = useState(null);
  const [midpointLat, setMidpointLat] = useState(null);
  const [midpointLng, setMidpointLng] = useState(null);
  const [distance, setDistance] = useState(null);
  const [midpoint, setMidpoint] = useState(null);
  // const [guessed, setGuessed] = useState(false);
  // const locations = [{lat: 44.6620659, lng: -63.5992192},{}];
  const {
    center,
    recenter,
    zoom,
    setZoom,
    guessed,
    setGuessed,
    resetMap,
    locationIndex,
  } = useContext(MapContext);

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

  let clickSpot = null;

  // let answerCoords = {lat: 44.6620659, lng: -63.5992192};
  let answerCoords = locations[locationIndex];

  let answer = new google.maps.LatLng(answerCoords);

  const mapClickHandler = (ev) => {
    setTimeout(() => {
      clickSpot = ev.latLng;
      console.log(ev.latLng.lng(), "lng", ev.latLng.lat(), "lat");
      setClickedLng(ev.latLng.lng());
      setClickedLat(ev.latLng.lat());
      setDistance(
        google.maps.geometry.spherical.computeDistanceBetween(answer, clickSpot)
      );
      let midpointLat = (ev.latLng.lat() + answerCoords.lat) / 2;
      let midpointLng = (ev.latLng.lng() + answerCoords.lng) / 2;
      if (Math.abs(midpointLng - ev.latLng.lng()) > 90) {
        midpointLng = midpointLng + 180;
      }
      setMidpoint(new google.maps.LatLng(midpointLat, midpointLng));

      console.log("midpoint", midpoint);
      console.log(distance);
    }, 300);
  };
  console.log("distance", distance);
  console.log("zoom", zoom);

  return (
    <>
      <Container>
        <MapContainer fullSize={guessed}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
            onClick={(ev) => {
              if (!guessed) {
                mapClickHandler(ev);
              }
            }}
          >
            {clickedLat && clickedLng && (
              <>
                <Marker
                  position={{lat: clickedLat, lng: clickedLng}}
                  options={options}
                  clickable={false}
                  cursor={false}
                />

                {guessed && (
                  <Marker
                    position={{lat: answer.lat(), lng: answer.lng()}}
                    clickable={false}
                    cursor={false}
                  ></Marker>
                )}
              </>
            )}
            {guessed && (
              <Polyline
                path={[{lat: clickedLat, lng: clickedLng}, midpoint, answer]}
                options={lineOptions}
              ></Polyline>
            )}
          </GoogleMap>
        </MapContainer>
        <GoogleMap
          mapContainerStyle={streetViewStyle}
          options={streetViewOptions}
          linksControl={false}
        >
          <StreetViewPanorama
            position={answerCoords}
            visible={true}
            options={streetViewOptions}
          />
        </GoogleMap>
      </Container>
      <button
        onClick={() => {
          recenter(midpoint.lat(), midpoint.lng(), distance);
          setGuessed(!guessed);
        }}
        disabled={guessed}
      >
        Guess
      </button>
      {guessed && (
        <button
          onClick={() => {
            resetMap();
            setClickedLat(null);
            setClickedLng(null);
          }}
        >
          Next
        </button>
      )}
    </>
  );
};

export default Map;

const Container = styled.div`
  position: relative;
  width: 98vw;
  @media (min-width: 900px) {
    width: 90vw;
    margin-left: 5px;
    position: relative;
  }
`;
const MapContainer = styled.div`
  &:hover {
    width: 60%;
  }
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 500;
  width: ${(props) => (props.fullSize ? "100%" : "38%")};
`;
