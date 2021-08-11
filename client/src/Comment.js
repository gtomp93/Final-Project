import React from "react";
import styled from "styled-components";

const Comment = ({comment}) => {
  return (
    <Container>
      <Pic src={comment.pic} />
      <CommentBubble>
        <CommentText>{comment.comment}</CommentText>
      </CommentBubble>
    </Container>
  );
};

export default Comment;

const CommentBubble = styled.div`
  display: flex;
  align-items: center;
  /* padding: 0 10px 0; */
`;

const CommentText = styled.div`
  height: 20px;
  background: #f0eee9;
  border: solid lightGrey 1px;
  border-radius: 8px;
  padding: 0 10px 2px;
  margin-left: 3px;
  @media (min-width: 650px) {
    height: 25px;
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  height: 6%;
  margin-top: 4px;
  margin-left: 5px;
`;

const Pic = styled.img`
  width: 27px;
  height: 27px;

  border-radius: 50%;
  @media (min-width: 650px) {
    width: 35px;
    height: 35px;
  }
`;
