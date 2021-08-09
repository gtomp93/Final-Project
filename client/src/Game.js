import React, {useContext, useState} from "react";
import styled from "styled-components";
import {FiHeart} from "react-icons/fi";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";

const Game = ({game, isLiked}) => {
  const [liked, setLiked] = useState(isLiked);
  const {currentUser} = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  console.log(game._id);

  const likeGame = async () => {
    fetch(`/likeGame/${game._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        liked: !liked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    await fetch(`/addLikeToUser/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify({
        likedGame: game._id,
        liked: !liked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("HEERE");
        setLiked(!liked);
        if (!liked) {
          setNumLikes(numLikes + 1);
        } else {
          setNumLikes(numLikes - 1);
        }
      });
  };

  return (
    <GameContainer>
      <Link to={`/gameOptions/${game._id}`}>{game.name}</Link>
      <GamePic src={game.pic}></GamePic>
      <div>{game.description}</div>
      <LikeButton
        onClick={() => {
          likeGame();
        }}
      >
        <FiHeart style={liked ? {fill: "red"} : {fill: "none"}} />
      </LikeButton>

      <Likes>{numLikes ? numLikes : null}</Likes>
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
