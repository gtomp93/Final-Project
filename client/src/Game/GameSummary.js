import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { GameContext } from "./GameContext";

const GameSummary = () => {
  const {
    gameState: { gameMode, gameScore, myGameData, otherPlayerData, playerMode },
  } = useContext(GameContext);
  const { currentUser } = useContext(UserContext);

  return (
    <>
      <StyledTable>
        <tr>
          <StyledTableHeader>Name</StyledTableHeader>
          <StyledTableHeader>Round 1</StyledTableHeader>
          <StyledTableHeader>Round 2</StyledTableHeader>
          <StyledTableHeader>Round 3</StyledTableHeader>
          <StyledTableHeader>Round 4</StyledTableHeader>
          <StyledTableHeader>Round 5</StyledTableHeader>
          <StyledTableHeader>Total Score</StyledTableHeader>
        </tr>

        <StyledRow>
          <StyledTableData>{currentUser.givenName}</StyledTableData>
          {myGameData.map((round) => {
            return (
              <StyledTableData>
                distance:{" "}
                {round.distance > 1000
                  ? Math.round(round.distance / 1000) + "km"
                  : Math.round(round.distance) + "m"}{" "}
                <div>score: {round.score}</div>
              </StyledTableData>
            );
          })}
          <StyledTableData>{gameScore}</StyledTableData>
        </StyledRow>

        {playerMode === "multi" &&
          otherPlayerData?.map((player) => {
            let playerScore = player.gameData.reduce((total, round) => {
              return total + round.score;
            }, 0);
            return (
              <StyledRow>
                <StyledTableData>{player.name}</StyledTableData>
                {player.gameData.map((round) => {
                  return (
                    <StyledTableData>
                      distance:{" "}
                      {round.distance > 1000
                        ? Math.round(round.distance / 1000) + "km"
                        : Math.round(round.distance) + "m"}{" "}
                      score: {round.score}{" "}
                    </StyledTableData>
                  );
                })}
                {[...Array(5 - player.gameData.length).keys()].map(() => (
                  <StyledTableData></StyledTableData>
                ))}

                <StyledTableData>{playerScore}</StyledTableData>
              </StyledRow>
            );
          })}
      </StyledTable>
    </>
  );
};

export default GameSummary;

const StyledTable = styled.table`
  color: white;
  border-collapse: collapse;
  @media (max-width: 500px) {
    margin-left: 50px;
    margin-left: 5vw;
    width: 500px;
  }
  @media (max-width: 467px) {
    margin-left: 10vw;
    width: 500px;
  }
  @media (max-width: 471px) {
    margin-left: 20vw;
    width: 500px;
  }
  @media (max-width: 471px) {
    margin-left: 25vw;
    width: 500px;
  }
  @media (max-width: 391px) {
    margin-left: 150px;
    width: 500px;
  }
`;

const StyledTableHeader = styled.th``;

const StyledTableData = styled.td`
  padding: 5px;
  border: 1px solid white;
`;

const StyledRow = styled.tr``;
