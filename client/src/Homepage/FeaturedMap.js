import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionBar from "../ActionBar";
import { ModalContext } from "../ModalContext";
import { UserContext } from "../UserContext";
const FeaturedMap = ({ game, isLiked }) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { currentUser, setStatus } = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const [liked, setLiked] = useState(isLiked);

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
    <Container
      onClick={(ev) => {
        if (!showModal) {
          navigate(`game/${game._id}`);
          setShowModal(game._id);
        }
        // ev.stopPropagation();
        // navigate(`/game/${game._id}`);
        // setShowModal(game._id);
      }}
    >
      {/* <Wrapper> */}
      <Title>{game.name}</Title>
      <Description>{game.description}</Description>
      <Author> Created by {game.creator}</Author>
      <Picture src={game.pic} />
      <ActionBar
        game={game}
        type="profile"
        likeGame={likeGame}
        featured={true}
      />
      {game._id === showModal && (
        <Outlet
          context={[showModal, setShowModal, liked, setLiked, likeGame, game]}
        />
      )}
    </Container>
  );
};

export default FeaturedMap;

const Container = styled.div`
  flex: 1;
  width: 50%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  transition: all 500ms;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* overflow: hidden; */
`;

const Title = styled.h2`
  padding-bottom: 2px;
  min-height: 0;

  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px 5px 0 0px;
  /* color: #155a08; */
  color: #1256d4;
  font-size: 30px;
  @media (max-width: 1240px) {
    font-size: 28px;
  }
`;
const Description = styled.h3`
  padding-bottom: 2px;
  min-height: 0;

  /* background-color: rgba(47, 90, 233, 0.25); */
  /* background-color: rgba(98, 88, 241, 0.15); */
  background-color: rgba(255, 255, 255, 0.5);

  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 20px;
  }
`;
const Author = styled.p`
  min-height: 0;
  /* height: 100%; */
  padding-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 16px;
  }
`;

const Picture = styled.img`
  width: 100%;
  min-height: 0;
  /* height: calc(100% - 140px); */
  /* height: 100%; */
  flex: 1;
  object-fit: cover;
`;
