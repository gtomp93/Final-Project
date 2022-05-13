import React from "react";
import { FiHeart, FiMessageCircle, FiPlay } from "react-icons/fi";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ActionBar = ({
  likeGame,
  game,
  numLikes,
  setNumLikes,
  liked,
  setLiked,
}) => {
  return (
    <ActionBarContainer>
      <LikeBox>
        <LikeButton
          onClick={(ev) => {
            ev.stopPropagation();
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
    </ActionBarContainer>
  );
};

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

const ActionBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media (min-width: 769px) {
    /* width: 93%; */
  }
`;

export default ActionBar;