import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Comment from "./Comment";
import GameModal from "./GameModal";
import ActionBar from "./ActionBar";
import { Outlet } from "react-router-dom";

const Game = ({ game, isLiked, updatePage, setUpdatePage }) => {
  const [liked, setLiked] = useState(isLiked);
  const { currentUser } = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  if (!game.comments) {
    return "loading";
  }

  // console.log(game);

  const likeGame = async () => {
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
        console.log("HEERE");
        if (!liked) {
          setNumLikes(numLikes + 1);
        } else {
          setNumLikes(numLikes - 1);
        }
      });
  };

  return (
    <GameContainer
      onClick={() => {
        navigate(`game/${game._id}`);
        setShowModal(true);
      }}
    >
      <Box>
        <Name>{game.name}</Name>
        <Description>{game.description}</Description>
        <Creator>Created by {game.creator}</Creator>
        <GamePic src={game.pic} />
        <ActionBar
          likeGame={likeGame}
          numLikes={numLikes}
          setNumLikes={setNumLikes}
          game={game}
          liked={liked}
          setLiked={setLiked}
        />
      </Box>

      {/* <Link to={`game/:${game._id}`}>Link</Link> */}
      {showModal && (
        <Outlet
          // showModal={showModal}
          // setShowModal={setShowModal}
          // game={game}
          // likeGame={likeGame}
          // numLikes={numLikes}
          // setNumLikes={setNumLikes}
          // liked={liked}
          // setLiked={setLiked}
          context={[showModal, setShowModal, liked, setLiked]}
        />
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: ${(props) => (props.deleted ? "none" : "flex")};
  /* margin-top: 20px; */
  /* position: relative; */
  /* width: 100% */
  z-index: 4;
  /* min-width: 350px; */
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: 400ms;

  &:hover {
    transform: scale(1.01);
  }
  @media (min-width: 700px) {
    /* width: 98vw; */
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255, 0.32);
  border-radius: 7px 7px 7px 7px;
  padding: 10px;
  @media (min-width: 700px) {
    /* width: 80%; */
  }
`;

const GamePic = styled.img`
  /* width: 100%; */
  height: 200px;
  object-fit: cover;
  object-position: bottom;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  flex: 1;
`;

const Name = styled.h2`
  font-size: 20px;
  padding: 0;
  /* all: unset; */
  @media (min-width: 769px) {
    font-size: 30px;
    margin: 0 0 5px;
  }
`;

const Description = styled.h3`
  font-weight: lighter;
  font-size: 15px;
  @media (min-width: 769px) {
    font-size: 23px;
    margin: 0 0 8px;
  }
`;

const Creator = styled.h4`
  font-size: 13px;
  /* width: 93%; */
  color: #030129;
  font-weight: bolder;
  margin-bottom: 10px;
  @media (min-width: 769px) {
    font-size: 18px;
    margin: 0 0 10px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const NumComments = styled.span``;

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
