import React from "react";
import styled from "styled-components";

const Comment = ({comment}) => {
  return (
    <Container>
      <Pic src={comment.pic} />
      <CommentText>{comment.comment}</CommentText>
    </Container>
  );
};

export default Comment;

const CommentText = styled.span`
  height: 25px;
  border: solid lightGrey 1px;
  border-radius: 8px;
  padding: 0 10px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  height: 6%;
`;

const Pic = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
