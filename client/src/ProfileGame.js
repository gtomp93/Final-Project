import React, {useContext, useState} from "react";
import styled from "styled-components";
import {FiHeart, FiMessageCircle, FiPlay} from "react-icons/fi";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";
import Comment from "./Comment";
import {BiTrash} from "react-icons/bi";

const ProfileGame = ({
  game,
  isLiked,
  updatePage,
  setUpdatePage,
  deleteGame,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const {currentUser} = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [addComment, setAddComment] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  // console.log(game);

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

  const submitComment = async (comment) => {
    setUpdatePage(!updatePage);
    await fetch(`/comment/${game._id}`, {
      method: "PUT",
      body: JSON.stringify({
        comment: comment,
        commentBy: currentUser._id,
        pic: currentUser.picture,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Gotten here");

        res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div style={deleted ? {display: "none"} : {display: "block"}}>
      <GameContainer>
        <Box>
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
                    <FiHeart
                      size="22px"
                      style={liked ? {fill: "red"} : {fill: "none"}}
                    />
                  </LikeButton>
                  <Likes>{numLikes ? numLikes : null}</Likes>{" "}
                </LikeBox>
              </div>
              <CommentBox>
                <FiMessageCircle size="22px" />
                <NumComments>
                  {game.comments.length ? game.comments.length : null}
                </NumComments>
              </CommentBox>
              <StartGame to={`/gameOptions/${game._id}`}>
                <FiPlay size="22px" style={{fill: "green"}} />
                <Play>Play</Play>
              </StartGame>
            </ActionBar>
          </GameBox>
          <CommentsSection>
            {game.comments.length > 2 && (
              <View
                onClick={() => {
                  setViewMore(!viewMore);
                }}
              >
                {viewMore ? "View Less Comments" : "View More Comments"}
              </View>
            )}
            {game.comments.map((comment, index) => {
              if (index >= game.comments.length - 2 && !viewMore) {
                return (
                  <Comment key={Math.random() * 999999} comment={comment} />
                );
              } else if (viewMore) {
                return (
                  <Comment key={Math.random() * 999999} comment={comment} />
                );
              }
            })}
            <CreateComment>
              <CommentInput
                placeholder="comment"
                onChange={(ev) => {
                  setComment(ev.target.value);
                  setInputValue(ev.target.value);
                }}
                value={inputValue}
              ></CommentInput>
              <Submit
                onClick={() => {
                  submitComment(comment);
                  setInputValue("");
                }}
              >
                Comment
              </Submit>
            </CreateComment>
          </CommentsSection>
          {/* {game.comments[0].comment && <div>{game.comments[0]}</div>}{" "}
      {game.comments[1].comment && <div>{game.comments[1]}</div>} */}
        </Box>
        <DeleteBox
          style={{
            display: "flex",
            // width: "80%",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <StyledButton
            style={{
              alignSelf: "flex-start",
              marginTop: "3px",
              marginBottom: "3px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              setToggleDelete(true);
            }}
          >
            <BiTrash style={{marginRight: "3px"}} />
            Delete Map
          </StyledButton>
        </DeleteBox>
        {toggleDelete && (
          <DeleteBox
            style={{
              display: "flex",
              // width: "80%",
              // flexDirection: "column",
              // alignSelf: "flex-start",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                alignSelf: "flex-start",
              }}
            >
              {" "}
              <div>Are you sure you want to delete this map?</div>
              <DeleteChoice
                onClick={() => {
                  deleteGame(game._id);
                  setDeleted(true);
                }}
                style={{marginLeft: "4px"}}
              >
                Yes
              </DeleteChoice>
              <DeleteChoice
                onClick={() => {
                  setToggleDelete(false);
                }}
                style={{marginLeft: "4px"}}
              >
                No
              </DeleteChoice>{" "}
            </div>
          </DeleteBox>
        )}
      </GameContainer>
    </div>
  );
};

const GameContainer = styled.div`
  display: ${(props) => (props.deleted ? "none" : "flex")};

  width: 100vw;
  margin-top: 20px;
  position: relative;
  z-index: 4;

  /* display: flex; */
  align-items: center;
  flex-direction: column;
  @media (min-width: 700px) {
    width: 98vw;
  }
`;

const Box = styled.div`
  width: 95%;

  background-color: rgb(255, 255, 255, 0.32);
  border-radius: 7px 7px 7px 7px;
  padding: 8px 0 0;
  @media (min-width: 700px) {
    width: 80%;
  }
`;

const GameBox = styled.div`
  /* width: 95%;
  background-color: rgb(255, 255, 255, 0.32);
  border-radius: 7px 7px 0 0;
  padding: 8px 0 0;
  @media (min-width: 700px) {
    width: 80%;
  } */
`;

const GameWrapper = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  margin-left: 5px;
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
    font-size: 30px;
    margin: 0 7px 5px;
  }
`;

const Description = styled.h3`
  font-weight: lighter;

  margin: 2px 2px 0;
  font-size: 15px;
  @media (min-width: 769px) {
    font-size: 23px;
    margin: 0 7px 8px;
  }
`;

const Creator = styled.h4`
  font-size: 13px;
  margin: 2px 2px 0;
  @media (min-width: 769px) {
    font-size: 18px;
    margin: 0 7px 0;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
`;

const CommentsSection = styled.div`
  /* width: 95%;
  background-color: rgb(255, 255, 255, 0.32);
  border-radius: 0 0 7px 7px;
  @media (min-width: 700px) {
    width: 80%;
  } */
`;

const View = styled.button`
  color: #e8e6df;
  background-color: none;
  background: none;
  border: none;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 650px) {
    font-size: 16px;
  }
`;

const DeleteBox = styled.div`
  width: 95%;
  @media (min-width: 700px) {
    width: 80%;
  }
`;
// const Play = styled.div`
//   background: inherit;
//   border: 1 px solid green;
//   border-radius: 5px;
//   border: none;
//   display: flex;
//   align-items: center;
//   box-shadow: none;
// `;

const DeleteChoice = styled.button`
  width: 30px;
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

const StyledButton = styled.button`
  background-color: #e8e6df;
  /* color: #b9bec7; */
  margin-top: 4px;
  /* border: solid grey 1px; */
  border: none;
  border-radius: 4px;
  /* color: #5a7bb0; */
  color: #2c2c30;
  /* box-shadow: 0 0 10px rgb(255 255 255 / 10%); */
  font-weight: bold;
  padding: 4px 7px 4px;
  &:disabled {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const CreateComment = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  padding: 0 0 5px;
`;

const NumComments = styled.span``;

const DescriptionWrapper = styled.div`
  width: 100%;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 66%;
  @media (min-width: 769px) {
    width: 77%;
  }
`;

const LikeButton = styled.button`
  background: inherit;
  border: none;
  &:hover {
    cursor: pointer;
  }
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

const CommentInput = styled.textarea`
  resize: none;
  margin-left: 4px;
  border-radius: 7px;
  width: 72%;
  @media (min-width: 769px) {
    width: 70%;
  }
`;

const Submit = styled.button`
  margin-left: 6px;
  border-radius: 6px;
  background: #e8e6df;
  border: none;
  height: 30px;
  font-weight: bolder;
  &:hover {
    cursor: pointer;
  }
`;

export default ProfileGame;
