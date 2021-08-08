import {GoogleMap, Polyline} from "@react-google-maps/api";
import React, {createContext, useContext, useState} from "react";
import {GameContext} from "./GameContext";
import {UserContext} from "./UserContext";

export const MapContext = createContext(null);

export const MapContextProvider = ({children}) => {
  const {currentUser} = useContext(UserContext);
  // console.log(currentUser, "user in map context");
  const {zoom, setZoom, setCenter, setGuessed} = useContext(GameContext);
  // const [center, setCenter] = useState({lat: 0, lng: 0});
  // const [zoom, setZoom] = useState(2);
  // const [guessed, setGuessed] = useState(false);
  // const [locationIndex, setLocationIndex] = useState(0);
  // const [status, setStatus] = useState("idle");
  // const [points, setPoints] = useState(0);

  // const submitGuess = (lat, lng, distance, clickspotLat) => {
  //   setCenter({lat, lng});
  //   let score = 0;
  //   if (distance > 3000000) {
  //     setZoom(1);
  //   } else if (
  //     distance > 1000000 &&
  //     (clickspotLat > 58 || clickspotLat < -58)
  //   ) {
  //     setZoom(1);
  //   } else if (distance > 1750000) {
  //     setZoom(2);
  //   } else if (distance > 1000000) {
  //     setZoom(3);
  //   } else if (distance > 500000) {
  //     setZoom(4);
  //   } else if (distance > 200000) {
  //     setZoom(5);
  //   } else if (distance > 100000) {
  //     setZoom(6);
  //   } else if (distance > 50000) {
  //     setZoom(7);
  //   } else if (distance > 20000) {
  //     setZoom(8);
  //   } else if (distance > 5000) {
  //     setZoom(9);
  //   } else if (distance > 1000) {
  //     setZoom(10);
  //   } else {
  //     setZoom(11);
  //   }

  //   if (distance <= 50) {
  //     score = 2000;
  //   } else if (distance <= 100) {
  //     score = 1900;
  //   } else if (distance <= 500) {
  //     score = 1800;
  //   } else if (distance <= 1000) {
  //     score = 1700;
  //   } else if (distance <= 10000) {
  //     score = 1600;
  //   } else if (distance <= 50000) {
  //     score = 1400;
  //   } else if (distance <= 100000) {
  //     score = 1200;
  //   } else if (distance <= 200000) {
  //     score = 1000;
  //   } else if (distance <= 350000) {
  //     score = 800;
  //   } else if (distance <= 600000) {
  //     score = 600;
  //   } else if (distance <= 800000) {
  //     score = 500;
  //   } else if (distance <= 1000000) {
  //     score = 300;
  //   } else if (distance < 2000000) {
  //     score = 200;
  //   } else if (distance < 2500000) {
  //     score = 100;
  //   } else if (distance < 3000000) {
  //     score = 50;
  //   }
  //   setPoints(score);
  //   fetch("/updateUserScore", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({_id: currentUser._id, score}),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res, "update user score response"));
  // };

  // if (!user) {
  //   return "loading";
  // }

  // const resetMap = () => {
  //   setGuessed(false);
  //   setLocationIndex(locationIndex + 1);
  //   setZoom(2);
  //   setCenter({lat: 0, lng: 0});
  // };

  return (
    <MapContext.Provider
      value={
        {
          // center,
          // submitGuess,
          // zoom,
          // setZoom,
          // guessed,
          // setGuessed,
          // resetMap,
          // locationIndex,
          // status,
          // setStatus,
          // points,
        }
      }
    >
      {children}
    </MapContext.Provider>
  );
};
