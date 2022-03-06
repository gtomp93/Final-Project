import React from "react";
import styled from "styled-components";

const Comment = ({ comment }) => {
  return (
    <Container>
      <Pic src={comment.pic} referrerpolicy="no-referrer"></Pic>
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
  flex-wrap: wrap;
`;

const CommentText = styled.div`
  font-size: 15px;
  background: #e8e6df;
  border: solid lightGrey 1px;
  border-radius: 8px;
  padding: 1px 10px 1px;
  margin-left: 3px;
  /* flex-wrap: wrap; */

  @media (min-width: 650px) {
    height: 22px;
    padding-top: 2px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 6%;
  margin-top: 4px;
  /* margin-left: 10px; */
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
