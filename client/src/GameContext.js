import React, {createContext, useContext, useState, useEffect} from "react";
import {UserContext} from "./UserContext";

export const GameContext = createContext(null);

export const GameContextProvider = ({children}) => {
  const {currentUser, status, setStatus} = useContext(UserContext);
  const [selected, setSelected] = useState(null);
  const [locations, setLocations] = useState();
  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [zoom, setZoom] = useState(2);
  const [guessed, setGuessed] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [found, setFound] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [error, setError] = useState(false);
  const [endGame, setEndGame] = useState(false);

  //   useEffect(() => {
  //     setLocations(
  //       JSON.parse(localStorage.getItem("locations"))
  //         ? JSON.parse(localStorage.getItem("cart"))
  //         : null
  //     );
  //   }, []);

  const loadGame = (id) => {
    console.log("LOADING");
    fetch(`/locations/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setLocations(res.randomLocations);
        // localStorage.setItem("locations", JSON.stringify(res.randomLocations));
      })
      .catch(setStatus("error"));
  };

  if (selected === "multi") {
  }

  const searchOpponent = (email) => {
    fetch("/checkusers", {
      method: "POST",
      body: JSON.stringify({email}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.doesNotExist) {
          setError(true);
        } else if (!res.doesNotExist) {
          console.log("found er");
          setOpponent(email);
        }
      });
  };

  const submitGuess = (lat, lng, distance, clickspotLat) => {
    setCenter({lat, lng});
    let score = 0;
    if (distance > 3000000) {
      setZoom(1);
    } else if (
      distance > 1000000 &&
      (clickspotLat > 58 || clickspotLat < -58)
    ) {
      setZoom(1);
    } else if (distance > 1750000) {
      setZoom(2);
    } else if (distance > 1000000) {
      setZoom(3);
    } else if (distance > 500000) {
      setZoom(4);
    } else if (distance > 200000) {
      setZoom(5);
    } else if (distance > 100000) {
      setZoom(6);
    } else if (distance > 50000) {
      setZoom(7);
    } else if (distance > 20000) {
      setZoom(8);
    } else if (distance > 5000) {
      setZoom(9);
    } else if (distance > 1000) {
      setZoom(10);
    } else {
      setZoom(11);
    }

    if (distance <= 50) {
      score = 2000;
    } else if (distance <= 100) {
      score = 1900;
    } else if (distance <= 500) {
      score = 1800;
    } else if (distance <= 1000) {
      score = 1700;
    } else if (distance <= 10000) {
      score = 1600;
    } else if (distance <= 50000) {
      score = 1400;
    } else if (distance <= 100000) {
      score = 1200;
    } else if (distance <= 200000) {
      score = 1000;
    } else if (distance <= 350000) {
      score = 800;
    } else if (distance <= 600000) {
      score = 600;
    } else if (distance <= 800000) {
      score = 500;
    } else if (distance <= 1000000) {
      score = 300;
    } else if (distance < 2000000) {
      score = 200;
    } else if (distance < 2500000) {
      score = 100;
    } else if (distance < 3000000) {
      score = 50;
    }
    setPoints(score);
    setGameScore(gameScore + score);

    if (locationIndex === locations.length - 1) {
      setEndGame(true);
    }

    fetch("/updateUserScore", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id: currentUser._id, score}),
    })
      .then((res) => res.json())
      .then((res) => console.log(res, "update user score response"));
  };

  const resetMap = () => {
    setGuessed(false);
    setLocationIndex(locationIndex + 1);
    setZoom(2);
    setCenter({lat: 0, lng: 0});
  };

  return (
    <GameContext.Provider
      value={{
        selected,
        setSelected,
        locations,
        loadGame,
        center,
        submitGuess,
        zoom,
        setZoom,
        guessed,
        setGuessed,
        locationIndex,
        points,
        gameScore,
        resetMap,
        opponent,
        setOpponent,
        searchOpponent,
        error,
        setError,
        endGame,
        setEndGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
