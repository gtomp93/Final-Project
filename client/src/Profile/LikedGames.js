import React from "react";
import { useOutletContext } from "react-router-dom";
import Game from "../Game";
import styled from "styled-components";

const LikedGames = () => {
  const [games, currentUser, deleteGame] = useOutletContext();
  console.log(games, "games on prof page");
  return (
    <>
      {games.liked.length ? (
        <GamesContainer>
          {games.liked.map((game) => {
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
        <Message>You haven't liked any maps yet 😢</Message>
      )}
    </>
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

const Message = styled.h2`
  color: white;
  margin-top: 20px;
`;
