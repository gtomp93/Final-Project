import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FiHeart, FiMessageCircle, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Comment from "./Comment";

const Game = ({ game, isLiked, updatePage, setUpdatePage }) => {
  const [liked, setLiked] = useState(isLiked);
  const { currentUser } = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);

  if (!game.comments) {
    return "loading";
  }

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
    <GameContainer>
      <Box>
        <Name>{game.name}</Name>
        <Description>{game.description}</Description>
        <Creator>Created by {game.creator}</Creator>
        <GamePic src={game.pic} />
        <ActionBar>
          <LikeBox>
            <LikeButton
              onClick={() => {
                likeGame();
              }}
            >
              <FiHeart
                size="22px"
                style={liked ? { fill: "red" } : { fill: "none" }}
              />
            </LikeButton>
            <Likes>{numLikes ? numLikes : null}</Likes>{" "}
          </LikeBox>
          <CommentBox>
            <FiMessageCircle size="22px" style={{ fill: "#d3d2d9" }} />
            <NumComments>
              {game.comments
                ? game.comments.length
                  ? game.comments.length
                  : null
                : null}
            </NumComments>
          </CommentBox>
          <StartGame to={`/gameOptions/${game._id}`}>
            <FiPlay size="22px" style={{ fill: "green" }} />
            <Play>Play</Play>
          </StartGame>
        </ActionBar>
      </Box>
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
  all: unset;
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

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media (min-width: 769px) {
    /* width: 93%; */
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
