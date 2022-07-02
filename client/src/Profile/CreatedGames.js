import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Game from "../Game";

const CreatedGames = () => {
  const [games, currentUser, deleteGame] = useOutletContext();
  return (
    <>
      {games.created.length ? (
        <GamesContainer>
          {games.created.map((game) => {
            if (game) {
              let isLiked = currentUser.likes.includes(game._id);
              return (
                // <div style={{ display: "flex", flexDirection: "column" }}>
                <Game
                  key={Math.random() * 9999}
                  game={game}
                  isLiked={isLiked}
                  deleteGame={deleteGame}
                  type="profile"
                />
                // </div>
              );
            }
          })}
        </GamesContainer>
      ) : (
        <Message>
          You haven't{" "}
          <Link to="/CreateMapForm" style={{ color: "lightskyblue" }}>
            created any games
          </Link>{" "}
          yet
        </Message>
      )}
    </>
  );
};

export default CreatedGames;

const GamesContainer = styled.div`
  /* display: ${(props) => (props.created ? "block" : "none")}; */
  /* margin: 30px auto; */
  width: calc(100% - 40px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin: 15px 0 20px;
  color: black;
`;

const Message = styled.h2`
  color: white;
  margin-top: 20px;
`;
