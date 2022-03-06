import React, { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { UserContext } from "./UserContext";
import ReactDOM from "react-dom";
import Game from "./Game";
import { BiX } from "react-icons/bi";
export default function GameModal({ game, showModal, setShowModal, test }) {
  console.log(showModal);
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [viewMore, setViewMore] = useState(false);
  console.log(game);

  const submitComment = async (comment) => {
    //   setUpdatePage(!updatePage);
    //   await fetch(`/comment/${game._id}`, {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       comment: comment,
    //       commentBy: currentUser._id,
    //       pic: currentUser.picture,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => {
    //       console.log("Gotten here");
    //       res.json();
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
  };

  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer>
        <Title>{game.name}</Title>
        <Description>{game.description}</Description>
        <Creator>{game.creator}</Creator>
        <MapImage src={game.pic} />
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
              return <Comment key={Math.random() * 999999} comment={comment} />;
            } else if (viewMore) {
              return <Comment key={Math.random() * 999999} comment={comment} />;
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
        <CloseModal
          onClick={(ev) => {
            ev.stopPropagation();
            console.log("clicked");
            setShowModal(false);
          }}
        >
          <BiX />
        </CloseModal>
      </ModalContainer>
    </Overlay>,
    document.getElementById("portal")
    //
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 4;
`;

const Title = styled.h1`
  margin: 0;
`;

const CloseModal = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 8;
  border-radius: 5px;
  margin: 6px;
  width: 25px;
  height: 25px;
  opacity: 0.5;
  display: grid;
  place-items: center;
`;

const Description = styled.h2``;

const Creator = styled.p``;

const MapImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  /* display: block;
  margin: 0 auto; */
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* width: 100%; */
  /* justify-content: space-between; */
`;

const CreateComment = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  padding: 0 0 5px;
`;

const ModalContainer = styled.div`
  overflow: auto;
  position: fixed;
  max-height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  z-index: 5;
  background-color: #9ab2d9;
  padding: 5px 10px 10px 10px;
  border-radius: 6px;
`;

const CommentInput = styled.textarea`
  border-radius: 7px;
  width: 100%;
  resize: none;
  @media (min-width: 769px) {
    /* width: 70%; */
  }
`;

const Submit = styled.button`
  margin-left: 6px;
  border-radius: 6px;
  background: #e8e6df;
  border: none;
  height: 30px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.7);
  background-color: #07024d;
  border-radius: 9px 9px 9px 0;
  /* color: #5a7bb0; */
  padding: 0 5px 0;
  color: #d3d2d9;
`;

const View = styled.button`
  all: unset;
  color: #e8e6df;
  background-color: none;
  background: none;
  border: none;
  font-size: 14px;
  /* padding: 0 10px; */

  /* margin: 0; */
  /* align-self: center; */

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 650px) {
    font-size: 16px;
  }
`;
