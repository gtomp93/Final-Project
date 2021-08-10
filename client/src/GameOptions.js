import React, {useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GameContext} from "./GameContext";
import styled from "styled-components";

const GameOptions = () => {
  const {id} = useParams();
  const [search, setSearch] = useState("");

  console.log("id", id);
  console.log(search, "search");

  const {
    error,
    setSelected,
    loadGame,
    locations,
    opponent,
    setOpponent,
    searchOpponent,
    timed,
    setTimed,
  } = useContext(GameContext);

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
      <Multiplayer>
        <div>Multiplayer</div>
        <label>Search opponent by username</label>
        <input
          onChange={(ev) => {
            setSearch(ev.target.value);
          }}
        ></input>
        <Search onClick={() => searchOpponent(search)}>Search</Search>
        {error && <span>User not found</span>}
        {opponent && (
          <div>
            {" "}
            <span>Opponent found</span> <button>Start Game</button>
          </div>
        )}
      </Multiplayer>
      <Timed
        onClick={() => {
          setTimed("timed");
        }}
      >
        Timed
      </Timed>
      <Untimed
        onClick={() => {
          setTimed("untimed");
        }}
      >
        No Time Limits
      </Untimed>
      {locations && <Link to={`/map/${id}`}>Start</Link>}
    </div>
  );
};

const Multiplayer = styled.div`
  width: 280px;
  height: 150px;
  border: solid black 1px;
`;

const Search = styled.button`
  width: 80px;
  height: 20px;
`;

const Timed = styled.button``;

const Untimed = styled.button``;
{
  /* <button
          onClick={() => {
            setSelected("multi");
          }}
        >
          Multi-Player
        </button> */
}

export default GameOptions;
