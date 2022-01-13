import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { GameContext } from "./GameContext";
import { FiUser, FiUsers, FiClock } from "react-icons/fi";
import { BiAlarm, BiAlarmOff } from "react-icons/bi";

import styled from "styled-components";

const GameOptions = () => {
  const { id } = useParams();
  const [playerMode, setPlayerMode] = useState(null);
  const [timeMode, setTimeMode] = useState(null);
  let history = useHistory();

  const {
    gameState: { error, locations, _id, gameLink },
    setSelected,
    createGame,
    timed,
  } = useContext(GameContext);

  return (
    <div
      style={{
        width: "100vw",
        marginTop: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Choose Game Mode</h1>
      <h2 style={{ color: "white", marginBottom: "5px" }}>Select One</h2>
      <Mode>
        <ModeButton
          onClick={() => {
            setPlayerMode("single");
          }}
          style={playerMode === "single" ? { background: "#2bc425" } : null}
        >
          <FiUser size={"22px"} />
          <div>Single Player</div>
        </ModeButton>
        <ModeButton
          onClick={() => {
            setPlayerMode("multi");
          }}
          style={playerMode === "multi" ? { background: "#2bc425" } : null}
        >
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
      <h2 style={{ color: "white", marginBottom: "5px" }}>Select One</h2>

      <Mode>
        <Timed
          onClick={() => {
            setTimeMode("timed");
          }}
          style={timeMode === "timed" ? { background: "#2bc425" } : null}
        >
          <BiAlarm size={"22px"} />

          <div>Timed</div>
        </Timed>
        <Untimed
          onClick={() => {
            setTimeMode("untimed");
          }}
          style={timeMode === "untimed" ? { background: "#2bc425" } : null}
        >
          {" "}
          <BiAlarmOff size={"22px"} />
          <div>No Time Limits</div>
        </Untimed>
      </Mode>

      {(timeMode === "timed" || timeMode === "untimed") &&
        playerMode === "single" && (
          <StartGame
            onClick={async () => {
              await createGame(id, timeMode, playerMode);
              history.push(`/map/${_id}`);
            }}
          >
            Start
          </StartGame>
        )}
      {(timeMode === "timed" || timeMode === "untimed") &&
        playerMode === "multi" && (
          <StartGame
            onClick={async () => {
              await createGame(id, timeMode, playerMode);
            }}
          >
            Create Game
          </StartGame>
        )}
      {_id && <div>Game Link: {gameLink}</div>}
      {gameLink && (
        <StartGame
          onClick={() => {
            history.push(`/map/${_id}`);
          }}
        >
          Start
        </StartGame>
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

const StartGame = styled.button`
  display: block;
  width: 30px;
  font-size: 18px;

  padding: 1px 10px 1px;
  margin-top: 16px;
  background-color: rgba(0, 0, 0, 0.87);
  /* color: #b9bec7; */
  /* margin-top: 4px; */
  /* border: solid grey 1px; */
  /* margin-left: 8px; */

  text-decoration: none;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  font-size: 17px;
  padding: 3px 8px 3px 7px;
`;

const Search = styled.button`
  width: 80px;
  height: 20px;
`;

const ModeButton = styled.button`
  width: 80px;
  font-weight: bolder;
  border-radius: 6px;
`;

const Timed = styled.button`
  width: 80px;
  font-weight: bolder;
`;

const Untimed = styled.button`
  width: 80px;
  font-weight: bolder;
  border-radius: 6px;
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
