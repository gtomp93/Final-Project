import React from "react";
import { GameContextProvider } from "./GameContext";
import GameMap from "./GameMap";
const Game = () => {
  return (
    <GameContextProvider>
      {" "}
      <GameMap />
    </GameContextProvider>
  );
};

export default Game;
