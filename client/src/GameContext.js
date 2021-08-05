import React, {createContext, useContext, useState} from "react";
import {UserContext} from "./UserContext";

export const GameContext = createContext(null);

export const GameContextProvider = ({children}) => {
  const {status, setStatus} = useContext(UserContext);
  const [selected, setSelected] = useState(null);
  const [locations, setLocations] = useState(null);

  const loadGame = (id) => {
    fetch(`/locations/${id}`)
      .then((res) => res.json())
      .then((res) => setLocations(res.randomLocations))
      .catch(setStatus("error"));
  };

  if (selected === "multi") {
  }

  return (
    <GameContext.Provider value={{selected, setSelected, locations, loadGame}}>
      {children}
    </GameContext.Provider>
  );
};
