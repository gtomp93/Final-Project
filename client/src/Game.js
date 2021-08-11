import React, {useContext, useState} from "react";
import styled from "styled-components";
import {FiHeart, FiMessageCircle, FiPlay} from "react-icons/fi";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";
import Comment from "./Comment";

const Game = ({game, isLiked}) => {
  const [liked, setLiked] = useState(isLiked);
  const {currentUser} = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");

  console.log(game);

  // if (!currentUser) {
  //   return "loading";
  // }

  // if (game.comments.length) {
  //   comments = game.comments;
  // }

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

  const submitComment = (comment) => {
    fetch(`/comment/${game._id}`, {
      method: "PUT",
      body: JSON.stringify({
        comment: comment,
        commentBy: currentUser._id,
        pic: currentUser.picture,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => console.log(res)));
  };

  return (
    <GameContainer>
      <GameWrapper>
        <PicWrapper>
          <GamePic src={game.pic} />
        </PicWrapper>
        <DescriptionWrapper>
          <div>{game.name}</div>
          <div>{game.description}</div>
        </DescriptionWrapper>
      </GameWrapper>

      <ActionBar>
        <div>
          <LikeBox>
            <LikeButton
              onClick={() => {
                likeGame();
              }}
            >
              <FiHeart style={liked ? {fill: "red"} : {fill: "none"}} />
            </LikeButton>
            <Likes>{numLikes ? numLikes : null}</Likes>{" "}
          </LikeBox>
        </div>
        <CommentBox>
          <FiMessageCircle />
          <NumComments>
            {game.comments.length ? game.comments.length : null}
          </NumComments>
        </CommentBox>
        <Play>
          <StartGame to={`/gameOptions/${game._id}`}>
            <FiPlay />

            <span>Play</span>
          </StartGame>
        </Play>
      </ActionBar>
      {game.comments.map((comment) => {
        return <Comment key={Math.random() * 9999} comment={comment} />;
      })}

      <CommentInput
        placeholder="comment"
        onChange={(ev) => {
          setComment(ev.target.value);
          setInputValue(ev.target.value);
        }}
      ></CommentInput>
      <Submit
        onClick={() => {
          submitComment(comment);
          setInputValue("");
        }}
      >
        Submit
      </Submit>

      {/* {game.comments[0].comment && <div>{game.comments[0]}</div>}{" "}
      {game.comments[1].comment && <div>{game.comments[1]}</div>} */}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  width: 100vw;
  /* margin-bottom: 20px; */
  height: 30vh;
  @media (min-width: 700px) {
    height: 600px;
  }
`;

const GameWrapper = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const GamePic = styled.img`
  width: 100%;
`;

const CommentBox = styled.div``;

const LikeBox = styled.div``;

const Play = styled.button`
  background: inherit;
  border: 1 px solid grey;
  border-radius: 5px;
`;

const NumComments = styled.span``;

const PicWrapper = styled.div`
  width: 50%;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 66%;
`;

const LikeButton = styled.button`
  background: inherit;
  border: none;
`;

const StartGame = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Likes = styled.span``;

const CommentInput = styled.input``;

const Submit = styled.button``;

export default Game;
