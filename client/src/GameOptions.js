import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {GameContext} from "./GameContext";
import {FiUser, FiUsers, FiClock} from "react-icons/fi";
import {BiAlarm, BiAlarmOff} from "react-icons/bi";

import styled from "styled-components";

const GameOptions = () => {
  const {id} = useParams();
  const [search, setSearch] = useState("");

  console.log("id", id);
  console.log(search, "search");

  const {
    error,
    setSelected,
    selected,
    loadGame,
    locations,
    setLocations,
    opponent,
    setOpponent,
    searchOpponent,
    timed,
    setTimed,
  } = useContext(GameContext);

  return (
    <div style={{marginLeft: "20px", marginTop: "25px"}}>
      <h1>Choose Game Mode</h1>
      <h2 style={{color: "white", marginBottom: "5px"}}>Select One</h2>
      <Mode>
        <ModeButton
          onClick={() => {
            setSelected("single");
            loadGame(id);
          }}
          selected={selected}
          style={selected === "single" ? {background: "#2bc425"} : null}
        >
          <FiUser size={"22px"} />
          <div>Single Player</div>
        </ModeButton>
        <ModeButton>
          <FiUsers size={"22px"} />
          <div>Multi-Player</div>
        </ModeButton>
      </Mode>

      {/* <Multiplayer>
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

      </Multiplayer> */}
      <h2 style={{color: "white", marginBottom: "5px"}}>Select One</h2>

      <Mode>
        <Timed
          onClick={() => {
            setTimed("timed");
          }}
          style={timed === "timed" ? {background: "#2bc425"} : null}
        >
          <BiAlarm size={"22px"} />

          <div>Timed</div>
        </Timed>
        <Untimed
          onClick={() => {
            setTimed("untimed");
          }}
          style={timed === "untimed" ? {background: "#2bc425"} : null}
        >
          {" "}
          <BiAlarmOff size={"22px"} />
          <div>No Time Limits</div>
        </Untimed>
      </Mode>

      {locations &&
        (timed === "timed" || timed === "untimed") &&
        (selected === "single" || selected === "multi") && (
          <StartGame to={`/map/${id}`}>Start</StartGame>
        )}
    </div>
  );
};

const Multiplayer = styled.div`
  width: 280px;
  height: 75px;
  border: solid black 1px;
  margin: 5px 0 5px;
`;

const Mode = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StartGame = styled(Link)`
  display: block;
  width: 35px;
  font-size: 18px;
  background-color: #b9bec7;
  text-align: center;
  text-decoration: none;
  color: black;
  padding: 1px 10px 1px;
  border: solid black 1px;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  border-radius: 4px;
  font-weight: bolder;
  margin-top: 16px;
`;

const Search = styled.button`
  width: 80px;
  height: 20px;
`;

const ModeButton = styled.button`
  width: 80px;
  font-weight: bolder;
`;

const Timed = styled.button`
  width: 80px;
  font-weight: bolder;
`;

const Untimed = styled.button`
  width: 80px;
  font-weight: bolder;
`;
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
