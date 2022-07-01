import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Game from "../Game";
import { UserContext } from "../UserContext";
import { Container, SubTitle } from "./styledComponents";
import FeaturedMap from "./FeaturedMap";

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
            <FeaturedMap
              type="featured"
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
  gap: 25px;
  border: 1px solid red;
  height: calc(100% - 29px);
`;
