import React from "react";
import styled from "styled-components";
import ActionBar from "../ActionBar";

const FeaturedMap = ({ game }) => {
  const { showModal, setShowModal } = useContext(ModalContext);

  return (
    <Container>
      <Title>{game.name}</Title>
      <Description>{game.description}</Description>
      <Author>{game.creator}</Author>
      <Picture src={game.pic} />
      <ActionBar game={game} />
    </Container>
  );
};

export default FeaturedMap;

const Container = styled.div`
  width: 50%;
  /* border: 1px solid blue; */
`;
const Title = styled.h2`
  color: #196b09;
  font-size: 30px;
`;
const Description = styled.h3``;
const Author = styled.p``;

const Picture = styled.img`
  width: 100%;
`;
