import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Game from "../Game";

const LikedGames = () => {
  const [games, currentUser, deleteGame] = useOutletContext();
  return (
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
  );
};

export default LikedGames;

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
