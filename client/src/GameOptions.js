import React, {useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GameContext} from "./GameContext";

const GameOptions = () => {
  const {id} = useParams();
  console.log("id", id);
  const {selected, setSelected, loadGame, locations} = useContext(GameContext);

  return (
    <div style={{marginLeft: "20px", marginTop: "25px"}}>
      <button
        onClick={() => {
          setSelected("single");
          loadGame(id);
        }}
      >
        Single Player
      </button>
      <button
        onClick={() => {
          setSelected("multi");
        }}
      >
        Multi-Player
      </button>
      {locations && <Link to={`/map/${id}`}>Start</Link>}
    </div>
  );
};

export default GameOptions;
