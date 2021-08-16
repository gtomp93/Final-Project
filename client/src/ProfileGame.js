import React, {useContext, useState} from "react";
import styled from "styled-components";
import {FiHeart, FiMessageCircle, FiPlay} from "react-icons/fi";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";
import Comment from "./Comment";

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
          {game.comments.map((comment) => {
            return <Comment key={Math.random() * 999999} comment={comment} />;
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
      </GameContainer>
      <div style={{display: "flex", flexDirection: "column"}}>
        <button
          style={{
            width: "200px",
            alignSelf: "center",
            marginTop: "3px",
          }}
          onClick={() => {
            setToggleDelete(true);
          }}
        >
          Delete {game.name}
        </button>
      </div>
      {toggleDelete && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{display: "flex"}}>
            {" "}
            <div>Are you sure you want to delete this map?</div>
            <DeleteChoice
              onClick={() => {
                deleteGame(game._id);
                setDeleted(true);
              }}
            >
              Yes
            </DeleteChoice>
            <DeleteChoice
              onClick={() => {
                setToggleDelete(false);
              }}
            >
              No
            </DeleteChoice>{" "}
          </div>
        </div>
      )}
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

const GameBox = styled.div`
  width: 95%;
  background-color: rgb(255, 255, 255, 0.32);
  border-radius: 7px 7px 0 0;
  padding: 8px 0 0;
  @media (min-width: 700px) {
    width: 80%;
  }
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
  width: 95%;
  background-color: rgb(255, 255, 255, 0.32);
  border-radius: 0 0 7px 7px;
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
`;

const LikeButton = styled.button`
  background: inherit;
  border: none;
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
  margin-left: 4px;
  border-radius: 7px;
  width: 70%;
  @media (min-width: 769) {
    width: 50%;
  }
`;

const Submit = styled.button`
  margin-left: 6px;
  border-radius: 6px;
  background: #e8e6df;
  border: none;
  height: 30px;
  font-weight: bolder;
`;

export default ProfileGame;