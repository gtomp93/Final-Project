import React from "react";
import { GameContextProvider } from "./GameContext";
import Map from "./Map";
const GameMap = () => {
  return (
    <GameContextProvider>
      {" "}
      <Map />
    </GameContextProvider>
  );
};

export default GameMap;
