import React, { useContext } from "react";
import { FiHeart, FiMessageCircle, FiPlay } from "react-icons/fi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ModalContext } from "./ModalContext";

const ActionBar = ({
  likeGame,
  game,
  numLikes,
  setNumLikes,
  liked,
  type,
  featured,
}) => {
  const { currentUser, setStatus } = useContext(UserContext);
  const { setShowModal } = useContext(ModalContext);
  return (
    <ActionBarContainer featured={featured}>
      <LikeBox>
        <LikeButton
          onClick={(ev) => {
            ev.stopPropagation();
            likeGame();
          }}
        >
          <FiHeart
            size="22px"
            style={
              liked
                ? { fill: "red", color: "black" }
                : type === "profile"
                ? { fill: "none", color: "black" }
                : { fill: "none", color: "white" }
            }
          />
        </LikeButton>
        <Likes
          style={type === "profile" ? { color: "black" } : { fill: "#d3d2d9" }}
        >
          {numLikes ? numLikes : null}
        </Likes>{" "}
      </LikeBox>
      <CommentBox>
        <FiMessageCircle
          size="22px"
          style={type === "profile" ? { color: "black" } : { fill: "#d3d2d9" }}
        />
        <NumComments
          style={type === "profile" ? { color: "black" } : { fill: "#d3d2d9" }}
        >
          {game.comments
            ? game.comments.length
              ? game.comments.length
              : null
            : null}
        </NumComments>
      </CommentBox>
      <StartGame
        onClick={(ev) => {
          setShowModal(false);
          ev.stopPropagation();

          if (!currentUser) {
            setStatus({ error: "play" });
            ev.preventDefault();
            ev.stopPropagation();
            return;
          }
        }}
        to={`/gameOptions/${game._id}`}
      >
        <FiPlay
          style={
            type === "profile"
              ? { color: "black", fill: "green" }
              : { color: "white", fill: "green" }
          }
          size="22px"
        />
        <Play
          style={type === "profile" ? { color: "black" } : { color: "white" }}
        >
          Play
        </Play>
      </StartGame>
    </ActionBarContainer>
  );
};

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const NumComments = styled.span`
  color: white;
`;
const LikeButton = styled.button`
  background: inherit;
  border: none;
  padding: 0px;
  padding-right: 4px;
  color: white;
`;

const StartGame = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  color: black;
  color: white;
`;

const Play = styled.span`
  font-weight: bolder;
`;

const Likes = styled.span`
  margin-bottom: 4px;
`;

const ActionBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ featured }) => (featured ? "4px" : "10px")};
`;

export default ActionBar;
