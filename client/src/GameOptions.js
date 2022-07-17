import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUser, FiUsers } from "react-icons/fi";
import { BiAlarm, BiAlarmOff } from "react-icons/bi";

import styled from "styled-components";
import { UserContext } from "./UserContext";

const GameOptions = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const [playerMode, setPlayerMode] = useState(null);
  const [timeMode, setTimeMode] = useState(null);
  let navigate = useNavigate();
  const [gameLink, setGameLink] = useState(null);
  const [newGameId, setNewGameId] = useState(null);
  const createGame = async (timeMode) => {
    let randomLocations = null;
    let mapName = null;
    let gameId = null;
    await fetch(`https://mapguesser-server.herokuapp.com/api/locations/${id}`)
      .then((res) => res.json())
      .then((res) => {
        randomLocations = res.randomLocations;
        mapName = res.name;
      })
      .catch((err) => {
        // dispatch({ type: "error", error: err.stack });
        console.log(err.stack);
      });

    await fetch("https://mapguesser-server.herokuapp.com/api/createGame", {
      method: "POST",
      body: JSON.stringify({
        player: currentUser,
        icon: currentUser.picture,
        locations: randomLocations,
        mode: playerMode,
        name: mapName,
        timeMode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        gameId = res.gameId;

        if (playerMode === "single") {
          navigate(`/map/${gameId}`);
        } else {
          setGameLink(`https://mapguesser-client.herokuapp.com/map/${gameId}`);
          setNewGameId(gameId);
          return gameId;
        }
      });
  };

  return (
    <Container>
      <Wrapper
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Choose Game Mode</h1>
        <h2 style={{ color: "#5e5e5e", marginBottom: "5px" }}>Select One</h2>
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

        <h2 style={{ color: "#5e5e5e", marginBottom: "5px" }}>Select One</h2>

        <Mode>
          <ModeButton
            onClick={() => {
              setTimeMode("timed");
            }}
            style={timeMode === "timed" ? { background: "#2bc425" } : null}
          >
            <BiAlarm size={"22px"} />

            <div>Timed</div>
          </ModeButton>
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
                let gameId = null;
                gameId = await createGame(timeMode);
              }}
            >
              Start
            </StartGame>
          )}
        {(timeMode === "timed" || timeMode === "untimed") &&
          playerMode === "multi" && (
            <StartGame
              onClick={async () => {
                await createGame(timeMode);
              }}
            >
              Create Game
            </StartGame>
          )}
        {gameLink && (
          <div>
            <h2 style={{ marginBottom: "10px" }}>
              Copy this link and send it to your friends to play multiplayer
              mode:{" "}
            </h2>
            <h3>{gameLink}</h3>
          </div>
        )}
        {gameLink && (
          <StartGame
            onClick={() => {
              navigate(`/map/${newGameId}`);
            }}
          >
            Start
          </StartGame>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 44px);
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_693729124.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 320px;
  max-width: 90%;
  background-color: rgba(255, 255, 255, 0.5);
  height: fit-content;
  padding-bottom: 35px;
  border-radius: 8px;
`;

const Mode = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StartGame = styled.button`
  display: block;
  width: fit-content;
  font-size: 18px;

  padding: 1px 10px 1px;
  margin-top: 16px;
  background-color: rgba(0, 0, 0, 0.87);

  text-decoration: none;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  font-size: 17px;
  padding: 3px 8px 3px 7px;
`;

const ModeButton = styled.button`
  width: 80px;
  font-weight: bolder;
  border-radius: 6px;
`;

const Untimed = styled.button`
  width: 80px;
  font-weight: bolder;
  border-radius: 6px;
`;

export default GameOptions;
