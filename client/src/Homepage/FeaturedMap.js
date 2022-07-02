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
  /* background-color: rgba(47, 90, 233, 0.25); */

  width: 50%;
  max-height: 100%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  transition: all 500ms;
`;
// const Wrapper = styled.div`
//   height: 100%;
// `;

const Title = styled.h2`
  /* background-color: rgba(47, 90, 233, 0.25); */
  background-color: rgba(98, 88, 241, 0.15);

  /* color: #155a08; */
  color: #1256d4;
  font-size: 33px;
  @media (max-width: 1240px) {
    font-size: 28px;
  }
`;
const Description = styled.h3`
  /* background-color: rgba(47, 90, 233, 0.25); */
  background-color: rgba(98, 88, 241, 0.15);

  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 20px;
  }
`;
const Author = styled.p`
  background-color: rgba(98, 88, 241, 0.15);

  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 16px;
  }
`;

const Picture = styled.img`
  width: 100%;
  height: calc(100% - 140px);
  object-fit: cover;
`;
