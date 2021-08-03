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
  width: "100%",
  aspectRatio: "9/5",
};

const streetViewStyle = {
  width: "300px",
  aspectRatio: "9/5",
  position: "absolute",
  bottom: "23px",
  right: "0",
};

const streetViewOptions = {
  disableDefaultUI: true,
  enableCloseButton: false,
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
  const [line, setLine] = useState(false);
  const path = [];
  const {center, recenter, zoom, setZoom} = useContext(MapContext);

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

  let nyc = new google.maps.LatLng(40.715, -74.002);
  let london = new google.maps.LatLng(51.506, -0.119);

  const mapClickHandler = (ev) => {
    setTimeout(() => {
      clickSpot = ev.latLng;
      console.log(ev.latLng.lng(), "lng", ev.latLng.lat(), "lat");
      setClickedLng(ev.latLng.lng());
      setClickedLat(ev.latLng.lat());
      setDistance(
        google.maps.geometry.spherical.computeDistanceBetween(nyc, clickSpot)
      );
      let midpointLat = (ev.latLng.lat() + 40.715) / 2;
      let midpointLng = (ev.latLng.lng() - 74.002) / 2;
      if (Math.abs(midpointLng - ev.latLng.lng()) > 90) {
        midpointLng = midpointLng + 180;
      }
      setMidpoint(new google.maps.LatLng(midpointLat, midpointLng));

      console.log("midpoint", midpoint);
      console.log(distance);
    }, 350);
  };
  console.log("distance", distance);
  console.log("zoom", zoom);

  return (
    <Container>
      {/* <RenderMap
        clickedLat={clickedLat}
        clickedLng={clickedLng}
        mapClickHandler={mapClickHandler}
        midpoint={midpoint}
        nyc={nyc}
        center={center}
        line={line}
        // midpointLng={midpointLng}
        // midpointLat={midpointLat}
      /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
        onClick={(ev) => {
          mapClickHandler(ev);
        }}
        style={{width: "75v", top: "0", left: "0"}}
        // onLoad={onLoad}
      >
        {/* <StreetViewPanorama
          position={{lat: 44.657627, lng: -63.5932431}}
          visible={true}
          style={{width: "30px", height: "30px"}}
        /> */}
        {clickedLat && clickedLng && (
          <>
            <Marker position={{lat: clickedLat, lng: clickedLng}} />
            {/* {midpoint && (
              <Marker
                position={{lat: midpoint.lat(), lng: midpoint.lng()}}
              ></Marker>
            )} */}
            {line && (
              <Marker position={{lat: nyc.lat(), lng: nyc.lng()}}></Marker>
            )}
          </>
        )}
        {line && (
          <Polyline
            path={[{lat: clickedLat, lng: clickedLng}, midpoint, nyc]}
            options={lineOptions}
          ></Polyline>
        )}
      </GoogleMap>
      <GoogleMap
        mapContainerStyle={streetViewStyle}
        options={streetViewOptions}
        linksControl={false}
      >
        <StreetViewPanorama
          position={{lat: 44.657627, lng: -63.5932431}}
          visible={true}
          options={streetViewOptions}
        />
      </GoogleMap>
      <button
        onClick={() => {
          recenter(midpoint.lat(), midpoint.lng(), distance);
          setLine(true);
        }}
      >
        guess
      </button>
    </Container>
  );
};

export default Map;

const Container = styled.div`
  position: relative;
  width: 98vw;
  @media (min-width: 900px) {
    width: 80vw;
    margin-left: 5px;
  }
`;
