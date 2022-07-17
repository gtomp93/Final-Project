import React, { useContext } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { calculateScore } from "./calculateScore";
import { GameContext } from "./GameContext";

const BottomContainer = ({
  submitGuess,
  midpoint,
  distance,
  clickedLat,
  clickedLng,
  testPoint,
  id,
  expand,
  setExpand,
  setHide,
  resetMap,
  setViewSummary,
  hide,
  setClickedLat,
  setClickedLng,
  viewSummary,
  otherPlayerData,
}) => {
  const {
    gameState: {
      guess,
      locations,
      guessDistance,
      myGameData,
      guessed,
      endGame,
      timeMode,
    },
    dispatch,
    timer,
  } = useContext(GameContext);

  const calculateSummaryCenter = () => {
    let otherPlayerLocations = otherPlayerData
      ? otherPlayerData.reduce((playerGuesses, player, index) => {
          return [
            ...playerGuesses,
            ...player.gameData.map((round) => round.guess),
          ];
        }, [])
      : [];
    let myLocations = myGameData.map((round) => round.guess);
    let allLocations = [...myLocations, ...otherPlayerLocations, ...locations];
    let sums = allLocations.reduce(
      (acc, cur) => {
        return cur !== null && cur !== undefined
          ? {
              ...acc,
              lat: acc.lat + cur.lat,
              lng: acc.lng + cur.lng,
            }
          : acc;
      },
      { lat: 0, lng: 0 }
    );
    let newCenter = {
      lat: sums.lat / allLocations.length,
      lng: sums.lng / allLocations.length,
    };

    setViewSummary(!viewSummary);

    dispatch({ type: "viewSummary", center: newCenter });
  };

  return (
    <Container>
      <StyledButton
        onClick={() => {
          submitGuess(
            midpoint.lat(),
            midpoint.lng(),
            distance,
            clickedLat,
            clickedLng,
            testPoint,
            id
          );
          setExpand(false);
          setHide(true);
        }}
        disabled={!clickedLat || guessed}
      >
        Guess
      </StyledButton>
      {timeMode === "timed" && !endGame && <TimerDisplay>{timer}</TimerDisplay>}
      {endGame && (
        <>
          {!viewSummary ? (
            <StyledButton onClick={calculateSummaryCenter}>
              View Summary
            </StyledButton>
          ) : (
            <StyledButton
              onClick={() => {
                let zoom = calculateScore(guessDistance, guess.lat).zoom;
                dispatch({
                  type: "closeSummary",
                  center: myGameData[4].midpoint,
                  zoom,
                });

                setViewSummary(!viewSummary);
              }}
            >
              Go Back{" "}
            </StyledButton>
          )}
        </>
      )}
      {!guessed && (
        <div style={{ display: "flex" }}>
          <StyledButton
            onClick={() => {
              setHide(!hide);
              setExpand(false);
            }}
          >
            {hide ? "Show Map" : "Hide Map"}
          </StyledButton>
          {!hide && (
            <ExpandButton
              onClick={() => {
                setExpand(!expand);
                setHide(false);
              }}
            >
              <ExpandArrows size="20px" />
              <span style={{ marginLeft: "5px" }}>
                {expand ? "Collapse Map" : "Expand Map"}
              </span>
            </ExpandButton>
          )}
        </div>
      )}
      {guessed && !endGame && (
        <StyledButton
          onClick={async () => {
            await resetMap();
            setClickedLat(null);
            setClickedLng(null);
            setExpand(false);
            setHide(true);
          }}
        >
          Next
        </StyledButton>
      )}
      {endGame && <Home to={"/"}>Home</Home>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Home = styled(Link)`
  display: grid;
  align-items: center;
  width: 39px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  width: fit-content;
  padding: 3px 7px 4px;
  font-size: 22px;

  background-color: rgba(0, 0, 0, 0.87);
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  border-radius: 4px;
  margin-top: 4px;
`;

const StyledButton = styled.button`
  background-color: rgba(0, 0, 0, 0.87);
  margin-top: 4px;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  padding: 3px 7px 4px;
  font-size: 22px;
  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;

const TimerDisplay = styled.div`
  font-weight: bolder;
  font-size: 22px;
  position: absolute;
  left: 50%;
  color: white;
  transform: translateX(50%);
`;

const ExpandButton = styled.button`
  display: none;
  background-color: rgba(0, 0, 0, 0.87);
  color: #b9bec7;
  margin-top: 4px;
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  font-weight: bold;
  padding: 4px 7px 4px;
  margin-left: 5px;
  @media (min-width: 501px) {
    display: flex;
    align-items: center;
  } ;
`;

const ExpandArrows = styled(BsArrowsFullscreen)``;

export default BottomContainer;
