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
      <GameBox>
        <GameWrapper>
          <PicWrapper>
            <GamePic src={game.pic} />
          </PicWrapper>
          <DescriptionWrapper>
            <Name>{game.name}</Name>
            <Description>{game.description}</Description>
            <Creator>Created by {game.creator}</Creator>
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
      </GameBox>
      <CommentsSection>
        {game.comments.map((comment) => {
          return <Comment key={Math.random() * 9999} comment={comment} />;
        })}
        <CreateComment>
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
        </CreateComment>
      </CommentsSection>
      {/* {game.comments[0].comment && <div>{game.comments[0]}</div>}{" "}
      {game.comments[1].comment && <div>{game.comments[1]}</div>} */}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  width: 100vw;
  margin-bottom: 20px;
  /* height: 30vh; */
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (min-width: 700px) {
    /* height: 600px; */
  }
`;

const GameBox = styled.div`
  width: 100vw;

  @media (min-width: 700px) {
    width: 80%;
  }
`;

const GameWrapper = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const GamePic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const PicWrapper = styled.div`
  width: 50%;
`;

const Name = styled.h2`
  margin: 0px 2px 0;
  font-size: 20px;
  /* font-weight: lighter; */
  @media (min-width: 769px) {
    font-size: 25px;
  }
`;

const Description = styled.h3`
  font-weight: lighter;

  margin: 2px 2px 0;
  font-size: 15px;
  @media (min-width: 769px) {
    font-size: 19px;
  }
`;

const Creator = styled.h4`
  font-size: 10px;
  margin: 2px 2px 0;
`;

const LikeBox = styled.div``;

const CommentsSection = styled.div`
  width: 100vw;

  @media (min-width: 700px) {
    width: 80%;
  }
`;

const Play = styled.button`
  background: inherit;
  border: 1 px solid grey;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const CommentBox = styled.div``;

const CreateComment = styled.div`
  margin-top: 7px;
`;

const NumComments = styled.span``;

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

const CommentInput = styled.textarea`
  border-radius: 7px;
  width: 70%;
  @media (min-width: 769) {
    width: 50%;
  }
`;

const Submit = styled.button``;

export default Game;
