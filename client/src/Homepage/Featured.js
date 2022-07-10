import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { Container, SubTitle } from "./styledComponents";
import FeaturedMap from "./FeaturedMap";

const Featured = ({ showModal, setShowModal, maps }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <StyledContainer>
      <SubTitle style={{ fontSize: "38px" }}> Featured Maps </SubTitle>
      <StyledWrapper>
        {maps?.map((game) => {
          let isLiked = currentUser?.likes.includes(game._id);

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
  /* height: auto; */
  max-height: 100%;
  padding-bottom: 0;
`;

const StyledWrapper = styled.div`
  /* flex: 1; */
  height: calc(100% - 48px);
  display: flex;
  gap: 25px;
`;
