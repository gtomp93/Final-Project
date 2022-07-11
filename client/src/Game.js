import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import ActionBar from "./ActionBar";
import { Outlet } from "react-router-dom";
import { ModalContext } from "./ModalContext";

const Game = ({ game, isLiked, index, type, gameId, route }) => {
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
    fetch(`https://mapguesser-server.herokuapp.com/api/likeGame/${game._id}`, {
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

    await fetch(
      `https://mapguesser-server.herokuapp.com/api/addLikeToUser/${currentUser._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          likedGame: game._id,
          liked: !liked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        // if (!showModal) {
        navigate(`game/${game._id}`);
        setShowModal(game._id);
        // }
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
      {game._id === showModal || gameId === game._id ? (
        <Outlet
          context={[liked, setLiked, numLikes, setNumLikes, game, route]}
        />
      ) : null}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: ${(props) => (props.deleted ? "none" : "flex")};

  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: 400ms;

  &:hover {
    transform: scale(1.01);
  }
  @media (min-width: 700px) {
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

  padding: 10px;
  @media (min-width: 700px) {
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
  color: white;
  color: ${({ type }) => (type === "profile" ? "#444546" : "white")};

  font-size: 18px;
  @media (min-width: 769px) {
    font-size: 23px;
    margin: 0 0 8px;
  }
`;

const Creator = styled.h4`
  font-size: 13px;
  color: ${({ type }) => (type === "profile" ? "black" : "rgb(177, 180, 184)")};

  font-weight: bolder;
  margin-bottom: 10px;
  @media (min-width: 769px) {
    font-size: 18px;
    margin: 0 0 10px;
  }
`;

export default Game;
