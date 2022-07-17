import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { BiGlobe } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../UserContext";

const ActiveGames = () => {
  const { currentUser } = useContext(UserContext);
  const [activeGames, setActiveGames] = useState(null);
  const [finishedGames, setFinishedGames] = useState(null);
  useEffect(() => {
    fetch("/api/getMaps", {
      method: "PATCH",
      body: JSON.stringify({
        games: currentUser.games,
        email: currentUser.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setActiveGames(data.data.active);
        setFinishedGames(data.data.complete);
      });
  }, []);

  return (
    <Container>
      <Active>
        <Subtitle>Active Games</Subtitle>
        {activeGames &&
          activeGames.map((game) => {
            let date = "";
            if (game.type === "single") {
              date = format(game.time, "MMM do y 'at' h:mm");
              //
            } else {
              let timestamp = game.players?.find(
                (i) => i.player === currentUser.email
              ).time;
              date = format(timestamp, "MMM do y 'at' hh:mm");
            }

            return (
              <GameDiv to={`/map/${game._id}`}>
                <Flex>
                  <BiGlobe
                    size={90}
                    style={{ fill: "white", display: "block" }}
                  />
                  <div>
                    {" "}
                    <Info style={{ color: "lightgrey" }}>{game.name}</Info>{" "}
                    <Info style={{ color: "lightgrey" }}>
                      {game.type} player
                    </Info>
                    <Info style={{ color: "lightgrey" }}>{game.timeMode}</Info>
                  </div>
                </Flex>
                <div>
                  <LastPlayed style={{ color: "yellow" }}>
                    Last Played
                  </LastPlayed>

                  <LastPlayed style={{ color: "white" }}>{date}</LastPlayed>
                </div>
              </GameDiv>
            );
          })}
      </Active>
      <Complete>
        <Subtitle>Completed Games</Subtitle>
        {finishedGames &&
          finishedGames.map((game) => {
            console.log("huh");
            let date = "";

            if (game.type === "single") {
              date = format(game.time, "MMM do y 'at' h:mm");
              //
            } else {
              let timestamp = game.players?.find(
                (i) => i.player === currentUser.email
              ).time;
              date = format(timestamp, "MMM do y 'at' h:mm");
            }

            return (
              <GameDiv to={`/map/${game._id}`}>
                <Flex>
                  <BiGlobe
                    size={90}
                    style={{ fill: "white", display: "block" }}
                  />
                  <div>
                    <Info style={{ color: "lightgrey" }}>{game.name}</Info>
                    <Info style={{ color: "lightgrey" }}>
                      {game.type} player
                    </Info>
                    <Info style={{ color: "lightgrey" }}>{game.timeMode}</Info>
                  </div>
                </Flex>
                <div>
                  <LastPlayed style={{ color: "yellow" }}>
                    Last Played
                  </LastPlayed>

                  <LastPlayed style={{ color: "white" }}>{date}</LastPlayed>
                </div>
              </GameDiv>
            );
          })}
        {!activeGames === 0 && !finishedGames === 0 && (
          <Message>
            You haven't played any games yet. Try refreshing the page if you
            don't see a recent game!
          </Message>
        )}
      </Complete>
    </Container>
  );
};

export default ActiveGames;

const Container = styled.div`
  max-width: 95vw;
`;

const Active = styled.div``;

const Complete = styled.div``;

const Subtitle = styled.h2`
  color: lightskyblue;
  background-color: rgba(0, 0, 0, 0.6);
  width: fit-content;
`;

const GameDiv = styled(Link)`
  display: flex;
  text-decoration: none;
  gap: 16px;
  border: 1px solid lightblue;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Info = styled.p`
  font-size: 25px;
  max-width: 215px;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const LastPlayed = styled.p`
  font-size: 30px;

  @media (max-width: 800px) {
    font-size: 16px;
  }
`;

const Message = styled.h2`
  color: white;
  margin-top: 20px;
  max-width: 500px;
  width: 95%;
  text-align: center;
`;
