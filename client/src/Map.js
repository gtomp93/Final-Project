import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { GameContext } from "./GameContext";
import styled, { css } from "styled-components";
import { BsArrowsFullscreen } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import "./map.css";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  StreetViewPanorama,
  OverlayView,
} from "@react-google-maps/api";
import { Loading } from "./Loading";
/* eslint-disable no-undef */
/* global google */

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const streetViewStyle = {
  height: "100%",

  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
};

const options = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

const streetViewOptions = {
  disableDefaultUI: true,
  enableCloseButton: false,
  showRoadLabels: false,
  streetViewControl: true,
};

const libraries = ["geometry", "places"];

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
  const { id } = useParams();
  const [clickedLat, setClickedLat] = useState(null);
  const [clickedLng, setClickedLng] = useState(null);
  const [hide, setHide] = useState(true);
  const [distance, setDistance] = useState(null);
  const [expand, setExpand] = useState(false);

  const {
    midpoint,
    setMidpoint,
    testPoint,
    setTestPoint,
    gameState: {
      zoom,
      guessed,
      locations,
      thirdPoint,
      center,
      locationIndex,
      points,
      gameScore,
      endGame,
      stop,
      guessDistance,
      guess,
      otherPlayerData,
      timeMode,
    },
    resetMap,
    timer,
    setTimer,
    submitGuess,
    dispatch,
  } = useContext(GameContext);

  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (!locations && currentUser) {
      fetch(`https://mapguesser-server.herokuapp.com/api/getMap/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ currentUser }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const { data } = res;
          dispatch({
            type: "loadGame",
            id,
            guess: data.guess,
            guessDistance: data.distance,
            thirdPoint: data.thirdPoint,
            center: data.midPoint,
            playerMode: data.playerMode,
            locations: data.locations,
            guessed: data.guessed,
            points: data.points,
            endGame: data.endGame,
            gameScore: data.gameScore,
            gameLink: `localhost:3000/map/${id}`,
            timeMode: data.timeMode,
            stop: data.guessed,
            zoom: data.zoom,
            locationIndex: data.locationIndex,
            otherPlayerData: data.otherPlayerData,
          });
          if (data.guessed && data.timeMode === "timed") {
            setTimer(0);
          } else if (!data.guessed && data.timeMode === "timed") {
            setTimer((timer) => timer - 1);
          }
        });
    }
  }, [currentUser]);

  useEffect(() => {
    return () => setTimer(60);
  }, []);

  useEffect(() => {
    if (guessed) {
      setTimer(60);
    }
  }, []);

  useEffect(() => {
    if (timeMode === "timed" && guessed === false) {
      if (timer === 0 && guessed === false) {
        submitGuess(
          midpoint ? midpoint.lat() : null,
          midpoint ? midpoint.lng() : null,
          distance,
          clickedLat,
          clickedLng,
          testPoint,
          id
        );
      }
      timer > 0 && !stop && setTimeout(() => setTimer(timer - 1), 1000);
    }
  }, [timer]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (loadError) {
    return "error loading maps";
  }
  if (!isLoaded) {
    return <Loading />;
  }

  let clickSpot = null;

  let answerCoords = locations ? locations[locationIndex] : null;

  let answer = new window.google.maps.LatLng(answerCoords);
  const mapClickHandler = (ev) => {
    let testPointLng = null;
    setTimeout(() => {
      clickSpot = ev.latLng;
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
        if (midpointLat > 58) {
          midpointLat = midpointLat - 15;
        } else if (midpointLat < -58) {
          midpointLat = midpointLat + 15;
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
    }, 200);
  };

  console.log(guess?.lat, !guessed, "ehhlo");

  if (!locations) {
    return <Loading />;
  }

  return (
    <>
      <PageContainer picture={currentUser.picture} style={{}} beforeunload>
        <BigWrapper guessed={guessed}>
          {/* {timed === "timed" && <div>{timer}</div>} */}
          <MapsWrapper guessed={guessed}>
            <MapWrapper
              guessed={guessed}
              expand={expand}
              hide={hide}
              role="button"
              tabIndex="0"
              className="okay"
            >
              <GuessMap
                mapContainerStyle={mapContainerStyle}
                zoom={center.lat ? zoom : 1}
                // center={
                //   !guessed ? center : midpoint ? center : { lat: 0, lng: 0 }
                // }
                center={
                  !guessed
                    ? center
                    : midpoint || guess
                    ? center
                    : { lat: 0, lng: 0 }
                }
                onClick={(ev) => {
                  if (!guessed) {
                    mapClickHandler(ev);
                  }
                }}
                options={options}
                fullscreenControl={false}
              >
                {((clickedLat && clickedLng) || guessed) && (
                  <>
                    {!guessed && (
                      <Marker
                        position={{ lat: clickedLat, lng: clickedLng }}
                        clickable={false}
                      />
                    )}

                    {guessed && (
                      <>
                        {guess && (
                          <OverlayView
                            mapPaneName="markerLayer"
                            position={guess}
                          >
                            <img
                              className="yoo"
                              src={currentUser.picture}
                              style={{
                                marginRight: "0",
                                marginBottom: "0",
                                borderRadius: "50%",
                                width: "30px",
                                transform: "translate(-15px,-15px)",
                              }}
                            />
                          </OverlayView>
                        )}
                        <Marker
                          position={locations[locationIndex]}
                          clickable={false}
                        />

                        {otherPlayerData &&
                          otherPlayerData.map((player) => {
                            let playerData = player.gameData[locationIndex];

                            return playerData ? (
                              <>
                                {guess && (
                                  <Polyline
                                    path={[
                                      playerData.guess,
                                      playerData.thirdPoint,
                                      locations[locationIndex],
                                    ]}
                                  ></Polyline>
                                )}
                                {guess && (
                                  <OverlayView
                                    mapPaneName="markerLayer"
                                    position={playerData.guess}
                                  >
                                    <img
                                      className="yoo"
                                      src={player.icon}
                                      style={{
                                        marginRight: "0",
                                        marginBottom: "0",
                                        borderRadius: "50%",
                                        width: "30px",
                                        transform: "translate(-15px,-15px)",
                                      }}
                                    />
                                  </OverlayView>
                                )}
                              </>
                            ) : null;
                          })}
                        {guess && (
                          <Polyline
                            path={[guess, thirdPoint, locations[locationIndex]]}
                            options={lineOptions}
                          ></Polyline>
                        )}
                      </>
                    )}
                  </>
                )}
              </GuessMap>
            </MapWrapper>
            {answerCoords && (
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
            )}
          </MapsWrapper>
          {guessed && (
            <Message>
              {guess !== null
                ? `Your guess was ${(guessDistance / 1000).toFixed(
                    2
                  )} km away! You
              scored ${points} points!`
                : "You did not submit a guess. You scored 0 points"}
            </Message>
          )}
          {endGame && (
            <GameOver>Game Over. Your total score is {gameScore}!</GameOver>
          )}
          <BottomContainer>
            <StyledButton
              onClick={() => {
                submitGuess(
                  midpoint.lat(),
                  midpoint.lng(),
                  distance,
                  clickedLat,
                  clickedLng,
                  testPoint,
                  id
                );
                setExpand(false);
                setHide(true);
              }}
              disabled={!clickedLat || guessed}
            >
              Guess
            </StyledButton>
            {timeMode === "timed" && <TimerDisplay>{timer}</TimerDisplay>}

            {!guessed && (
              <div style={{ display: "flex" }}>
                <StyledButton
                  onClick={() => {
                    setHide(!hide);
                    setExpand(false);
                  }}
                >
                  {hide ? "Show Map" : "Hide Map"}
                </StyledButton>
                {!hide && (
                  <ExpandButton
                    onClick={() => {
                      setExpand(!expand);
                      setHide(false);
                    }}
                  >
                    <ExpandArrows size="20px" />
                    <span style={{ marginLeft: "5px" }}>
                      {expand ? "Collapse Map" : "Expand Map"}
                    </span>
                  </ExpandButton>
                )}
              </div>
            )}
            {guessed && !endGame && (
              <StyledButton
                onClick={async () => {
                  await resetMap();
                  setClickedLat(null);
                  setClickedLng(null);
                  setExpand(false);
                  setHide(true);
                }}
              >
                Next
              </StyledButton>
            )}
            {endGame && <Home to={"/"}>Home</Home>}
          </BottomContainer>
        </BigWrapper>
      </PageContainer>
    </>
  );
};

export default Map;

const GuessMap = styled(GoogleMap)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 500;
  display: block;

  width: ${({ guessed, expand, hide }) =>
    guessed || expand || !hide ? "100%" : "36%"};

  ${(guessed, expand) =>
    !guessed &&
    !expand &&
    css`
      transition: 250ms ease-in-out;

      @media (min-width: 500px) {
        &:hover,
        :focus,
        :active {
          width: 65%;
          height: 65%;
          opacity: 1;
        }
      }
    `};
  display: ${(props) => (props.guessed || !props.hide ? "block" : "none")};

  height: ${(props) => (props.guessed || !props.hide ? "100%" : "36%")};

  @media (min-width: 501px) {
    opacity: ${(props) => (props.guessed || props.expand ? "1" : "0.7")};
    display: ${(props) => (!props.hide || props.guessed ? "block" : "none")};
    width: ${(props) => (props.guessed || props.expand ? "100%" : "38%")};
    height: ${(props) => (props.guessed || props.expand ? "100%" : "36%")};
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
`;

const BigWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const GameOver = styled.div`
  color: #afb4bd;
  font-weight: bolder;
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

const Message = styled.div`
  color: #afb4bd;
  font-weight: bolder;
`;

const MapWrapper = styled.a`
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
        &:hover,
        :focus,
        :active {
          width: 65%;
          height: 65%;
          opacity: 1;
        }
      }
    `};
  display: ${(props) => (props.guessed || !props.hide ? "block" : "none")};

  height: ${(props) => (props.guessed || !props.hide ? "100%" : "36%")};

  @media (min-width: 501px) {
    opacity: ${(props) => (props.guessed || props.expand ? "1" : "0.7")};
    display: ${(props) => (!props.hide || props.guessed ? "block" : "none")};
    width: ${(props) => (props.guessed || props.expand ? "100%" : "38%")};
    height: ${(props) => (props.guessed || props.expand ? "100%" : "36%")};
  }
`;

const Home = styled(Link)`
  display: grid;
  align-items: center;
  width: 39px;
  font-size: 18px;
  font-weight: bold;
  /* background-color: #b9bec7; */
  text-align: center;
  text-decoration: none;
  /* color: black; */
  width: fit-content;
  padding: 1px 10px 2px;
  background-color: rgba(0, 0, 0, 0.87);
  color: #5a7bb0;
  /* border: solid black 1px; */
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  border-radius: 4px;
  /* font-weight: bolder; */
  margin-top: 16px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const TimerDisplay = styled.div`
  font-weight: bolder;
  font-size: 22px;
  position: absolute;
  left: 50%;
  color: white;
  transform: translateX(50%);
`;

const StyledButton = styled.button`
  background-color: rgba(0, 0, 0, 0.87);
  margin-top: 4px;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  padding: 3px 7px 4px;
  font-size: 22px;
  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;

const ExpandButton = styled.button`
  display: none;
  background-color: rgba(0, 0, 0, 0.87);
  color: #b9bec7;
  margin-top: 4px;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  padding: 4px 7px 4px;
  margin-left: 5px;
  @media (min-width: 501px) {
    display: flex;
    align-items: center;
  } ;
`;

const ExpandArrows = styled(BsArrowsFullscreen)``;
