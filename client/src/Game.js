import React, {useState} from "react";
import styled from "styled-components";
import {FiHeart} from "react-icons/fi";
import {Link} from "react-router-dom";

const Game = ({game, isLiked}) => {
  const [liked, setLiked] = useState(isLiked);

  const likeGame = async () => {
    await fetch(`/likeGame/${game._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        liked: !liked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json)
      .then((res) => {
        setLiked(!liked);
      });

    // await fetch(``)
  };

  const addToLikes = () => {};

  return (
    <GameContainer>
      <Link to={`/gameOptions/${game._id}`}>{game.name}</Link>
      <GamePic src={game.pic}></GamePic>
      <div>{game.description}</div>
      <LikeButton
        onClick={() => {
          setLiked(true);
          likeGame();
        }}
      >
        <FiHeart style={isLiked ? {fill: "red"} : {fill: "none"}} />
      </LikeButton>

      <Likes>{game.likes ? game.likes : null}</Likes>
    </GameContainer>
  );
};

const GameContainer = styled.div``;

const GamePic = styled.img`
  width: 50px;
  display: block;
`;

const LikeButton = styled.button`
  background: inherit;
  border: none;
`;

const Likes = styled.span``;

export default Game;
