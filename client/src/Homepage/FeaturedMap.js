import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionBar from "../ActionBar";
import { ModalContext } from "../ModalContext";
import { UserContext } from "../UserContext";
const FeaturedMap = ({ game, isLiked }) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  console.log(showModal, "showModal", game._id === showModal);
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
    <Container
      onClick={(ev) => {
        ev.stopPropagation();
        navigate(`/game/${game._id}`);
        setShowModal(game._id);
      }}
    >
      {/* <Wrapper> */}
      <Title>{game.name}</Title>
      <Description>{game.description}</Description>
      <Author> Created by {game.creator}</Author>
      <Picture src={game.pic} />
      <ActionBar game={game} type="profile" likeGame={likeGame} />
      {/* </Wrapper> */}
      {game._id === showModal && (
        // <>
        // {/* <div style={{ width: "100%", height: "100%", color: "red" }}> HI</div> */}
        <Outlet
          context={[showModal, setShowModal, liked, setLiked, likeGame, game]}
        />
        // </>
      )}
    </Container>
  );
};

export default FeaturedMap;

const Container = styled.div`
  /* background-color: rgba(47, 90, 233, 0.25); */

  width: 50%;
  max-height: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  transition: all 500ms;
`;

const Title = styled.h2`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  /* color: #155a08; */
  color: #1256d4;
  font-size: 33px;
  @media (max-width: 1240px) {
    font-size: 28px;
  }
`;
const Description = styled.h3`
  /* background-color: rgba(47, 90, 233, 0.25); */
  /* background-color: rgba(98, 88, 241, 0.15); */
  background-color: rgba(255, 255, 255, 0.5);

  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 20px;
  }
`;
const Author = styled.p`
  background-color: rgba(98, 88, 241, 0.15);
  background-color: rgba(255, 255, 255, 0.5);

  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 16px;
  }
`;

const Picture = styled.img`
  width: 100%;
  height: calc(100% - 140px);
  object-fit: cover;
`;
