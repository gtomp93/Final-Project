import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { UserContext } from "./UserContext";

export const GameContext = createContext(null);

const gameReducer = (state, action) => {
  switch (action.type) {
    case "clearGame":
      return {
        ...initialGame,
      };
    case "createGame":
      console.log("in the thing");
      return {
        ...state,
        locations: action.locations,
        playerMode: action.playerMode,
        timeMode: action.timeMode,
        _id: action._id,
        gameLink: `localhost:3000/map/${action._id}`,
      };
    case "loadGame":
      return {
        ...state,
        guess: action.guess,
        guessDistance: action.guessDistance,
        thirdPoint: action.thirdPoint,
        center: action.center,
        playerMode: action.playerMode,
        locations: action.locations,
        guessed: action.guessed,
        points: action.points,
        endGame: action.endGame,
        gameScore: action.gameScore,
        gameLink: action.gameLink,
        timed: action.timed,
        stop: action.stop,
        zoom: action.zoom,
        _id: action.id,
        locationIndex: action.locationIndex,
      };
    case "submitGuess":
      return {
        ...state,
        stop: true,
        center: action.center,
        gameScore: state.gameScore + action.score,
        endGame: action.endGame,
        timeMode: action.timed,
        points: action.score,
        guessed: true,
        guessDistance: action.guessDistance,
        guess: action.guess,
        zoom: action.zoom,
        thirdPoint: action.thirdPoint,
        otherPlayerData: action.otherPlayerData,
      };
    case "resetMap":
      return {
        ...state,
        stop: false,
        guessed: false,
        guess: null,
        distance: null,
        thirdPoint: null,
        locationIndex: state.locationIndex + 1,
        zoom: 2,
        center: { lat: 0, lng: 0 },
      };
    case "error":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

// setGameLink(`localhost:3000/${_id}`);

const initialGame = {
  _id: null,
  playerMode: null,
  locations: null,
  center: { lat: 0, lng: 0 },
  zoom: 2,
  guessed: false,
  guess: null,
  locationIndex: 0,
  points: 0,
  gameScore: 0,
  score: 0,
  guessDistance: null,
  error: null,
  endGame: false,
  stop: false,
  timer: 60,
  timeMode: null,
  thirdPoint: null,
  gameLink: null,
  otherPlayerData: null,
};

export const GameContextProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  const [gameState, dispatch] = useReducer(gameReducer, initialGame);

  // console.log(gameState, "HEYA");

  const [opponent, setOpponent] = useState(null);
  const [timer, setTimer] = useState(60);

  const createGame = async (id, timeMode, playerMode) => {
    let randomLocations = null;
    // console.log(playerMode);
    await fetch(`/locations/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        randomLocations = res.randomLocations;
      })
      .catch((err) => {
        dispatch({ type: "error", error: err.stack });
      });

    await fetch("/createGame", {
      method: "POST",
      body: JSON.stringify({
        player: currentUser.email,
        locations: randomLocations,
        mode: playerMode,
        timeMode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        dispatch({
          type: "createGame",
          locations: randomLocations,
          timeMode,
          playerMode,
          _id: res.gameId,
        });
        return;
      });
  };

  if (gameState.playerMode === "multi") {
  }

  const searchOpponent = (email) => {
    fetch("/checkusers", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.doesNotExist) {
          console.log("player not found");
        } else if (!res.doesNotExist) {
          setOpponent(email);
        }
      });
  };

  const submitGuess = async (
    lat,
    lng,
    guessDistance,
    clickspotLat,
    clickSpotLng,
    thirdPoint,
    id
  ) => {
    let score = 0;
    let zoom = 0;
    let endGame = false;
    let timed = gameState.timeMode;
    let otherPlayerData = null;

    if (gameState.playerMode === "multi") {
      const result = await fetch(
        `/loadOtherPlayers/${id}/${currentUser.email}`
      );
      const thing = await result.json();
      otherPlayerData = thing.data;
      console.log(thing, "thing");
    }

    if (guessDistance > 3000000) {
      zoom = 1;
    } else if (
      guessDistance > 1000000 &&
      (clickspotLat > 58 || clickspotLat < -58)
    ) {
      zoom = 2;
      console.log("here1");
    } else if (guessDistance > 1750000) {
      console.log("here2");

      zoom = 2;
    } else if (guessDistance > 1000000) {
      zoom = 3;
    } else if (guessDistance > 500000) {
      zoom = 4;
    } else if (guessDistance > 200000) {
      zoom = 5;
    } else if (guessDistance > 100000) {
      zoom = 6;
    } else if (guessDistance > 50000) {
      zoom = 7;
    } else if (guessDistance > 20000) {
      zoom = 8;
    } else if (guessDistance > 5000) {
      zoom = 9;
    } else if (guessDistance > 1000) {
      zoom = 10;
    } else {
      zoom = 11;
    }

    console.log(zoom, "zoom");

    if (guessDistance <= 100) {
      score = 2000;
    } else if (guessDistance <= 250) {
      score = 1975;
    } else if (guessDistance <= 500) {
      score = 1950;
    } else if (guessDistance <= 1000) {
      score = 1900;
    } else if (guessDistance <= 2000) {
      score = 1850;
    } else if (guessDistance <= 20000) {
      score = 1800;
    } else if (guessDistance <= 50000) {
      score = 1750;
    } else if (guessDistance <= 100000) {
      score = 1700;
    } else if (guessDistance <= 150000) {
      score = 1600;
    } else if (guessDistance <= 200000) {
      score = 1500;
    } else if (guessDistance <= 300000) {
      score = 1400;
    } else if (guessDistance <= 400000) {
      score = 1200;
    } else if (guessDistance <= 700000) {
      score = 1000;
    } else if (guessDistance <= 1200000) {
      score = 800;
    } else if (guessDistance <= 1600000) {
      score = 600;
    } else if (guessDistance <= 2000000) {
      score = 500;
    } else if (guessDistance <= 4000000) {
      score = 400;
    } else if (guessDistance <= 5000000) {
      score = 200;
    } else if (guessDistance <= 6000000) {
      score = 100;
    }

    if (gameState.locationIndex === gameState.locations.length - 1) {
      console.log("in this spot");
      endGame = true;
      timed = null;
    }

    console.log({ lat: clickspotLat, lng: clickSpotLng }, "guess");

    dispatch({
      type: "submitGuess",
      center: { lat, lng },
      guessDistance,
      ans: gameState.locations[gameState.locationIndex],
      guess: { lat: clickspotLat, lng: clickSpotLng },
      score,
      zoom,
      endGame,
      timed,
      thirdPoint,
      otherPlayerData,
    });

    // await fetch("/updateUserScore", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ _id: currentUser._id, score }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res, "update user score response"));
    await fetch("/submitGuess", {
      method: "PATCH",
      body: JSON.stringify({
        mode: gameState.playerMode,
        _id: gameState._id,
        score,
        distance: guessDistance,
        ans: gameState.locations[gameState.locationIndex],
        guess: { lat: clickspotLat, lng: clickSpotLng },
        thirdPoint,
        center: { lat, lng },
        player: currentUser.email,
        midPoint: { lat, lng },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const resetMap = async () => {
    await fetch("/nextLocation", {
      method: "PATCH",
      body: JSON.stringify({
        player: currentUser.email,
        mode: gameState.playerMode,
        _id: gameState._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "resetMap" });
    setTimer(60);
  };

  // console.log("here", gameState.locationIndex, gameState.zoom);

  return (
    <GameContext.Provider
      value={{
        gameState,
        dispatch,
        createGame,
        submitGuess,
        resetMap,
        opponent,
        setOpponent,
        searchOpponent,
        timer,
        setTimer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
