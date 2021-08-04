import React, {useState, useContext, Component} from "react";
import {MapContext} from "./MapContext";
import styled, {css} from "styled-components";
import {BsArrowsFullscreen} from "react-icons/bs";

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
  aspectRatio: "10/5",
  position: "relative",
  // top: "23px",
  // right: "0",
};

const options = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

const locations = [
  {lat: 62.0213432, lng: -7.2212925},
  {lat: 48.5245856, lng: -64.2058584},
  {lat: -22.9468822, lng: -43.1982841},
  {lat: 35.2835117, lng: 138.8666567},
  {lat: 37.322816, lng: -113.0400476},
  {lat: 0.6198964, lng: 73.4599683},
  {lat: 62.0218124, lng: -6.7825299},
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
  const [expand, setExpand] = useState(false);
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
    }, 200);
  };
  console.log("distance", distance);
  console.log("zoom", zoom);

  return (
    <>
      <Container>
        <StreetviewContainer>
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
            <MapContainer fullSize={guessed} expand={expand}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={center}
                onClick={(ev) => {
                  if (!guessed) {
                    mapClickHandler(ev);
                  }
                }}
                options={options}
                fullscreenControl={false}
              >
                {clickedLat && clickedLng && (
                  <>
                    <Marker
                      position={{lat: clickedLat, lng: clickedLng}}
                      clickable={false}
                    />

                    {guessed && (
                      <Marker
                        position={{lat: answer.lat(), lng: answer.lng()}}
                        clickable={false}
                      ></Marker>
                    )}
                  </>
                )}
                {guessed && (
                  <Polyline
                    path={[
                      {lat: clickedLat, lng: clickedLng},
                      midpoint,
                      answer,
                    ]}
                    options={lineOptions}
                  ></Polyline>
                )}
              </GoogleMap>
            </MapContainer>
          </GoogleMap>
          <BottomContainer>
            <button
              onClick={() => {
                recenter(midpoint.lat(), midpoint.lng(), distance);
                setGuessed(!guessed);
              }}
              disabled={!clickedLat}
            >
              Guess
            </button>
            {!guessed && (
              <ExpandButton
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <ExpandArrows size="20px" />
                <span style={{marginLeft: "5px"}}>
                  {expand ? "Collapse Map" : "Expand Map"}
                </span>
              </ExpandButton>
            )}
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
          </BottomContainer>
        </StreetviewContainer>
      </Container>
      {/* <BottomContainer>
        <button
          onClick={() => {
            recenter(midpoint.lat(), midpoint.lng(), distance);
            setGuessed(!guessed);
          }}
          disabled={guessed}
        >
          Guess
        </button>
        {!guessed && (
          <ExpandButton
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <ExpandArrows size="20px" />
            <span style={{marginLeft: "5px"}}>
              {expand ? "Collapse Map" : "Expand Map"}
            </span>
          </ExpandButton>
        )}
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
      </BottomContainer> */}
    </>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100vw;
  @media (min-width: 600px) {
    width: 100vw;
    margin-left: 5px;
    position: relative;
  }
`;

//BsArrowsFullscreen
const MapContainer = styled.div`
  ${(props) =>
    !props.fullSize &&
    css`
      @media (min-width: 769px) {
        &:hover {
          transition: 250ms;
          width: 60%;
        }
      }
    `};

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 500;
  width: ${(props) => (props.fullSize || props.expand ? "100%" : "38%")};
`;

// @media (hover: none) { … }

const StreetviewContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  @media (hover: none) {
    display: inline-block;
  }

  @media (min-width: 769px) {
    display: none;
  } ;
`;

const ExpandArrows = styled(BsArrowsFullscreen)`
  @media (hover: none) {
    z-index: 600;
    position: absolute;
    bottom: 31%;
    right: 34%;
    background-color: inherit;
    border: none;
  }

  @media (min-width: 769px) {
    display: none;
  } ;
`;

//  width: ${(props) => (props.fullSize ? "100%" : "38%")};
