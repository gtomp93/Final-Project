import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Comment from "./Comment";
import GameModal from "./GameModal";
import ActionBar from "./ActionBar";
import { Outlet } from "react-router-dom";
import { ModalContext } from "./ModalContext";

const Game = ({ game, isLiked, index, setUpdatePage, type }) => {
  const { showModal, setShowModal } = useContext(ModalContext);

  const [liked, setLiked] = useState(isLiked);
  const { currentUser, setStatus } = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const navigate = useNavigate();
  if (!game.comments) {
    return "loading";
  }

  const likeGame = async () => {
    if (!currentUser) {
      setStatus({ error: "like" });
      return;
    }

    setLiked(!liked);
    fetch(`/likeGame/${game._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        liked: !liked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json();
    });

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
        if (!liked) {
          setNumLikes(numLikes + 1);
        } else {
          setNumLikes(numLikes - 1);
        }
      });
  };

  return (
    <GameContainer
      type={type}
      index={index}
      onClick={() => {
        if (!showModal) {
          navigate(`game/${game._id}`);
          setShowModal(game._id);
        }
      }}
    >
      <Box>
        <Name type={type}>{game.name}</Name>
        <Description type={type}>{game.description}</Description>
        <Creator type={type}>Created by {game.creator}</Creator>
        <GamePic src={game.pic} />
        <ActionBar
          likeGame={likeGame}
          numLikes={numLikes}
          setNumLikes={setNumLikes}
          game={game}
          liked={liked}
          setLiked={setLiked}
          type={type}
        />
      </Box>
      {game._id === showModal && (
        <Outlet
          context={[showModal, setShowModal, liked, setLiked, likeGame, game]}
        />
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: ${(props) => (props.deleted ? "none" : "flex")};
  /* visibility: hidden; */
  /* margin-top: 20px; */
  /* position: relative; */
  /* width: 100% */
  /* z-index: 4; */
  /* min-width: 350px; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  cursor: pointer;
  transition: 400ms;

  &:hover {
    transform: scale(1.01);
  }
  @media (min-width: 700px) {
    /* width: 98vw; */
  }
  border-radius: 7px 7px 7px 7px;
  background-color: ${({ type }) =>
    type === "profile" ? "rgb(255,255,255,.51)" : "rgb(0, 0, 0, 0.66)"};
  -webkit-box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.27);
  box-shadow: 5px 5px 4px 5px rgba(0, 0, 0, 0.27);
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: rgb(5, 46, 77, 0.8); */

  //7, 59, 97,
  padding: 10px;
  @media (min-width: 700px) {
    /* width: 80%; */
  }
`;

const GamePic = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: bottom;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  flex: 1;
`;

const Name = styled.h2`
  font-size: 30px;
  padding: 0;

  color: ${({ type }) => (type === "profile" ? "#0e0091" : "#b103fc")};
  text-shadow: ${({ type }) =>
    type === "profile"
      ? "2px 2px 15px rgba(83, 55, 206, 0.86)"
      : "2px 2px 15px rgba(206, 89, 55, 0.86)"};
  @media (min-width: 769px) {
    font-size: 30px;
    margin: 0 0 5px;
  }
`;

const Description = styled.h3`
  /* color: rgb(66, 194, 245); */
  /* color: #46c1f2; */
  color: white;
  color: ${({ type }) => (type === "profile" ? "#444546" : "white")};

  /* font-weight: lighter; */
  font-size: 18px;
  @media (min-width: 769px) {
    font-size: 23px;
    margin: 0 0 8px;
  }
`;

const Creator = styled.h4`
  font-size: 13px;
  /* width: 93%; */
  color: ${({ type }) => (type === "profile" ? "black" : "rgb(177, 180, 184)")};

  /* color: #030129; */
  /* color: rgb(53, 56, 59); */
  font-weight: bolder;
  margin-bottom: 10px;
  @media (min-width: 769px) {
    font-size: 18px;
    margin: 0 0 10px;
  }
`;

const LikeButton = styled.button`
  background: inherit;
  border: none;
  padding: 0px;
  padding-right: 4px;
`;

const StartGame = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  color: black;
`;

const Play = styled.span`
  font-weight: bolder;
`;

const Likes = styled.span`
  margin-bottom: 4px;
`;

const StyledButton = styled.button`
  background-color: rgba(0, 0, 0, 0.87);
  /* color: #b9bec7; */
  margin-top: 4px;
  /* border: solid grey 1px; */
  border: none;
  border-radius: 4px;
  color: #5a7bb0;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);

  font-weight: bold;
  padding: 4px 7px 4px;
  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;

export default Game;
