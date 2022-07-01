import React, { useContext } from "react";
import styled from "styled-components";
import ActionBar from "../ActionBar";
import { ModalContext } from "../ModalContext";

const FeaturedMap = ({ game }) => {
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <Container>
      {/* <Wrapper> */}
      <Title>{game.name}</Title>
      <Description>{game.description}</Description>
      <Author> Created by {game.creator}</Author>
      <Picture src={game.pic} />
      <ActionBar game={game} type="profile" />
      {/* </Wrapper> */}
    </Container>
  );
};

export default FeaturedMap;

const Container = styled.div`
  width: 50%;
  border: 1px solid blue;
  max-height: 100%;
  height: 100%;
`;
// const Wrapper = styled.div`
//   height: 100%;
// `;

const Title = styled.h2`
  color: #196b09;
  font-size: 30px;
`;
const Description = styled.h3``;
const Author = styled.p``;

const Picture = styled.img`
  width: 100%;
  height: calc(100% - 130px);
`;
