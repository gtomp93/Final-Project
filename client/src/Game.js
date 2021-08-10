import React, {useContext, useState} from "react";
import styled from "styled-components";
import {FiHeart} from "react-icons/fi";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";

const Game = ({game, isLiked}) => {
  const [liked, setLiked] = useState(isLiked);
  const {currentUser} = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");

  console.log(game);

  if (!currentUser) {
    return "loading";
  }

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
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((res) => console.log(res)));
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
      {game.comments.map((item) => {
        return <div key={Math.random() * 9999}>{item.comment}</div>;
      })}
      {/* {game.comments[0].comment && <div>{game.comments[0]}</div>}{" "}
      {game.comments[1].comment && <div>{game.comments[1]}</div>} */}
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

const CommentInput = styled.input``;

const Submit = styled.button``;

export default Game;
