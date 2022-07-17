import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { calculateScore } from "./calculateScore";
export const GameContext = createContext(null);

const gameReducer = (state, action) => {
  switch (action.type) {
    case "clearGame":
      return {
        ...initialGame,
      };
    case "createGame":
      return {
        ...state,
        locations: action.locations,
        playerMode: action.playerMode,
        timeMode: action.timeMode,
        _id: action._id,
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
        timeMode: action.timeMode,
        stop: action.stop,
        zoom: action.zoom,
        _id: action.id,
        locationIndex: action.locationIndex,
        otherPlayerData: action.otherPlayerData,
        myGameData: action.myGameData,
      };
    case "submitGuess":
      return {
        ...state,
        stop: true,
        center: action.center,
        gameScore: state.gameScore + action.score,
        endGame: action.endGame,
        timeMode: action.timeMode,
        points: action.score,
        guessed: true,
        guessDistance: action.guessDistance,
        guess: action.guess,
        zoom: action.zoom,
        thirdPoint: action.thirdPoint,
        otherPlayerData: action.otherPlayerData,
        myGameData: action.gameData,
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
        timer: 60,
      };
    case "viewSummary":
      return {
        ...state,
        center: action.center,
        zoom: 2,
      };
    case "closeSummary":
      return {
        ...state,
        center: action.center,
        zoom: action.zoom,
      };
    // case "error":
    //   return { ...state, error: action.error };
    default:
      return state;
  }
};

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
  otherPlayerData: [],
  myGameData: [],
};

export const GameContextProvider = ({ children }) => {
  const { currentUser, status, setStatus } = useContext(UserContext);
  const [gameState, dispatch] = useReducer(gameReducer, initialGame);
  const [midpoint, setmidpoint] = useState(null);
  const [testPoint, setTestPoint] = useState(null);
  const [viewSummary, setViewSummary] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [timer, setTimer] = useState(60);
  const [countDown, setCountdown] = useState(6);

  const navigate = useNavigate();
  useEffect(() => {
    if (countDown < 1 && !currentUser) {
      setStatus({ error: "play" });
      navigate("/");
    } else {
      !currentUser && setTimeout(() => setCountdown(countDown - 1), 1000);
    }
  }, [countDown, currentUser]);

  const searchOpponent = (email) => {
    fetch("https://mapguesser-server.herokuapp.com/api/checkusers", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.doesNotExist) {
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
    let zoom = 1;
    let endGame = false;
    let timeMode = gameState.timeMode;
    let otherPlayerData = null;
    let gameData = [...gameState.myGameData];
    if (gameState.playerMode === "multi") {
      const result = await fetch(
        `https://mapguesser-server.herokuapp.com/api/loadOtherPlayers/${id}/${currentUser.email}`
      );
      const parsedResult = await result.json();
      otherPlayerData = parsedResult.data;
    }

    if (
      lat === null ||
      lng === null ||
      clickSpotLng === null ||
      clickspotLat === null
    ) {
      guessDistance = null;
    } else {
      score = calculateScore(guessDistance, clickspotLat).score;
      zoom = calculateScore(guessDistance, clickspotLat).zoom;
    }
    if (gameState.locationIndex === gameState.locations.length - 1) {
      endGame = true;
      timeMode = null;
    }

    gameData.push({
      score,
      distance: guessDistance,
      guess: clickspotLat
        ? {
            lat: clickspotLat,
            lng: clickSpotLng,
          }
        : null,
      thirdPoint: thirdPoint ? thirdPoint : { lat: 0, lng: 0 },
      midpoint: lat ? { lat, lng } : null,
    });

    dispatch({
      type: "submitGuess",
      center: lat ? { lat, lng } : { lat: 0, lng: 0 },
      guessDistance,
      ans: gameState.locations[gameState.locationIndex],
      guess: clickspotLat
        ? {
            lat: clickspotLat,
            lng: clickSpotLng,
          }
        : null,
      score,
      zoom,
      endGame,
      timeMode,
      thirdPoint: thirdPoint ? thirdPoint : { lat: 0, lng: 0 },
      otherPlayerData,
      gameData,
    });

    await fetch("https://mapguesser-server.herokuapp.com/api/submitGuess", {
      method: "PATCH",
      body: JSON.stringify({
        mode: gameState.playerMode,
        _id: gameState._id,
        score,
        distance: guessDistance,
        ans: gameState.locations[gameState.locationIndex],
        guess: clickspotLat ? { lat: clickspotLat, lng: clickSpotLng } : null,
        thirdPoint,
        center: { lat, lng },
        player: currentUser.email,
        midpoint: { lat, lng },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (endGame)
      await fetch(
        "https://mapguesser-server.herokuapp.com/api/updateUserScore",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: currentUser._id,
            score: gameState.gameScore + score,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {});
  };

  const resetMap = async () => {
    await fetch("https://mapguesser-server.herokuapp.com/api/nextLocation", {
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
    setmidpoint(null);
    setTestPoint(null);
    setTimer(60);
    return;
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        dispatch,
        submitGuess,
        resetMap,
        opponent,
        setOpponent,
        searchOpponent,
        timer,
        setTimer,
        midpoint,
        setmidpoint,
        testPoint,
        setTestPoint,
        viewSummary,
        setViewSummary,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
