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
  // boxShadow: "0px -2px 2px rgba(34,34,34,0.6)",
  // borderRadius: "6px",
  width: "100%",
  height: "100%",
};

const streetViewStyle = {
  height: "100%",
  // aspectRatio: "10/5",
  // position: "relative",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  // display: "none",
};

const options = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  // disableDefaultUI: true,
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
  const [hide, setHide] = useState(true);
  const [distance, setDistance] = useState(null);
  const [midpoint, setMidpoint] = useState(null);
  const [expand, setExpand] = useState(false);
  const [testPoint, setTestPoint] = useState(null);
  const [resize, setResize] = useState(false);
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
    let testPointLng = null;
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

      if (
        google.maps.geometry.spherical.computeDistanceBetween(
          answer,
          clickSpot
        ) > 1750000 &&
        (midpointLat > 58 || midpointLat < -58)
      ) {
        console.log("here");
        if (midpointLat > 58) {
          midpointLat = midpointLat - 35;
        } else if (midpointLat < -58) {
          midpointLat = midpointLat + 35;
        }
        setMidpoint(new google.maps.LatLng(midpointLat, midpointLng));
      }

      if (
        midpointLng - answerCoords.lng > 0 ||
        midpointLng - answerCoords.lng < -270
      ) {
        testPointLng = answerCoords.lng + 0.00001;
      } else if (
        midpointLng - answerCoords.lng < 0 ||
        midpointLng - answerCoords.lng > 270
      ) {
        testPointLng = answerCoords.lng - 0.00001;
      }

      setTestPoint(new google.maps.LatLng(answerCoords.lat, testPointLng));

      if (distance > 2000000) {
        setResize(true);
      }

      console.log("midpoint", midpoint);
      console.log(distance);
    }, 200);
  };
  console.log("distance", distance);
  console.log("zoom", zoom);
  console.log("resize", resize);

  return (
    <>
      <PageContainer>
        <BigWrapper guessed={guessed} resize={resize}>
          {/* <Container>
        <GoogleMapsContainer>
          <StreetviewContainer> */}
          <MapsWrapper resize={resize} guessed={guessed}>
            <MapWrapper guessed={guessed} expand={expand} hide={hide}>
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
                      testPoint,
                      answer,
                    ]}
                    options={lineOptions}
                  ></Polyline>
                )}
              </GoogleMap>
            </MapWrapper>
            {/* <StreetViewWrapper> */}
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
            {/* </StreetViewWrapper> */}
            {/* </StreetviewContainer> */}
            {/* <MapContainer guessed={guessed} expand={expand} hide={hide}> */}
          </MapsWrapper>
          {/* </MapContainer>
        </GoogleMapsContainer> */}
          <BottomContainer>
            <button
              onClick={() => {
                recenter(midpoint.lat(), midpoint.lng(), distance);
                setGuessed(!guessed);
                setExpand(false);
                setHide(true);
              }}
              disabled={!clickedLat || guessed}
            >
              Guess
            </button>
            {!guessed && (
              <div style={{display: "flex"}}>
                <HideButton
                  onClick={() => {
                    setHide(!hide);
                    setExpand(false);
                  }}
                >
                  {hide ? "Show Map" : "Hide Map"}
                </HideButton>
                {!hide && (
                  <ExpandButton
                    onClick={() => {
                      setExpand(!expand);
                      setHide(false);
                    }}
                  >
                    <ExpandArrows size="20px" />
                    <span style={{marginLeft: "5px"}}>
                      {expand ? "Collapse Map" : "Expand Map"}
                    </span>
                  </ExpandButton>
                )}
              </div>
            )}
            {guessed && (
              <button
                onClick={() => {
                  resetMap();
                  setClickedLat(null);
                  setClickedLng(null);
                  setExpand(false);
                  setHide(false);
                  setResize(false);
                }}
              >
                Next
              </button>
            )}
          </BottomContainer>
        </BigWrapper>
      </PageContainer>
    </>
  );
};

export default Map;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 95vh;
`;

const BigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (min-width: 600px) {
    width: 80%;
  }

  @media (min-width: 501px) and (max-height: 420px) {
    height: 90%;
  }
  @media (min-width: 501px) and (max-height: 300px) {
    height: 85%;
  }

  ${(props) =>
    props.guessed &&
    css`
      @media (min-width: 769px) and (min-height: 600px) {
        height: 67%;
        width: 55%;
      }
    `};
`;

const MapsWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9/5;
  ${(props) =>
    props.guessed &&
    css`
      @media (min-width: 769px) {
        height: 75%;
      }
    `};
`;

// const StreetViewWrapper = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
// `;

const MapWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 500;
  display: block;

  width: ${(props) =>
    props.guessed || props.expand || !props.hide ? "100%" : "36%"};

  ${(props) =>
    !props.guessed &&
    !props.expand &&
    css`
      transition: 250ms ease-in-out;

      @media (min-width: 500px) {
        &:hover {
          width: 65%;
          height: 65%;
        }
      }
    `};
  display: ${(props) => (props.guessed || !props.hide ? "block" : "none")};

  height: ${(props) => (props.guessed || !props.hide ? "100%" : "36%")};

  @media (min-width: 501px) {
    display: ${(props) => (!props.hide || props.guessed ? "block" : "none")};
    width: ${(props) => (props.guessed || props.expand ? "100%" : "38%")};
    height: ${(props) => (props.guessed || props.expand ? "100%" : "36%")};
  }
`;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
//   width: 100vw;
//   @media (min-width: 600px) {
//     width: 100vw;
//     margin-left: 5px;
//     position: relative;
//   }
// `;

// const GoogleMapsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: relative;
// `;

// //BsArrowsFullscreen
// const MapContainer = styled.div`
//   ${(props) =>
//     !props.guessed &&
//     !props.expand &&
//     css`
//       @media (min-width: 500px) {
//         &:hover {
//           transition: 250ms;
//           width: 60%;
//         }
//       }
//     `};
//   display: ${(props) => (props.guessed || !props.hide ? "block" : "none")};
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   z-index: 500;
//   width: ${(props) =>
//     props.guessed || props.expand || !props.hide ? "100%" : "38%"};
//   @media (min-width: 501px) {
//     display: ${(props) => (!props.hide ? "block" : "none")};
//     width: ${(props) => (props.guessed || props.expand ? "100%" : "38%")};
//   }
// `;

// // @media (hover: none) { … }

// const StreetviewContainer = styled.div`
//   width: 80%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HideButton = styled.button``;

const ExpandButton = styled.button`
  display: none;

  @media (min-width: 501px) {
    display: flex;
    align-items: center;
  } ;
`;

const ExpandArrows = styled(BsArrowsFullscreen)``;

// //  width: ${(props) => (props.fullSize ? "100%" : "38%")};
