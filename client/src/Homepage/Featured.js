import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Game from "../Game";
import { UserContext } from "../UserContext";
import { Container, SubTitle } from "./styledComponents";

const Featured = ({ showModal, setShowModal, maps }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <StyledContainer>
      <SubTitle> Featured Maps </SubTitle>
      <StyledWrapper>
        {maps?.map((game, index) => {
          let isLiked = false;
          if (currentUser?.likes.includes(game._id)) {
            isLiked = true;
          }
          return (
            <Game
              type="featured"
              index={index}
              game={game}
              isLiked={isLiked}
              key={Math.random() * 99999}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          );
        })}
      </StyledWrapper>
    </StyledContainer>
  );
};

export default Featured;

const StyledContainer = styled(Container)`
  /* min-height: 90%; */
  justify-content: flex-start;
  /* > div {
    width: 100%;
  } */
`;

const StyledWrapper = styled.div`
  display: flex;
`;
