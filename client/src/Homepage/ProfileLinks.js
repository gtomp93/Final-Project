import React from "react";
import { FiHeart, FiMapPin, FiMap } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./styledComponents";

const ProfileLinks = () => {
  return (
    <Container>
      <Wrapper>
        <StyledLink to="/profile">
          <Title>Liked Maps</Title>
          <FiHeart
            style={{
              width: "80%",
              height: "80%",
              display: "block",
              margin: "0 auto",
              fill: "lightpink",
            }}
          />
        </StyledLink>
        <StyledLink to="/profile/created">
          {" "}
          <Title>Created Maps</Title>
          <FiMapPin
            style={{
              width: "80%",
              height: "75%",
              display: "block",
              margin: "0 auto",
              fill: "lightgreen",
            }}
          />
        </StyledLink>
        <StyledLink to="/profile/active">
          {" "}
          <Title>Active Games</Title>
          <FiMap
            style={{
              width: "80%",
              height: "80%",
              display: "block",
              margin: "0 auto",
              fill: "green",
            }}
          />
        </StyledLink>
      </Wrapper>
    </Container>
  );
};

export default ProfileLinks;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: block;
  /* border: 1px solid red; */
  &:hover {
    transform: scale(1.04);
  }
`;

const Title = styled.h2`
  font-size: 35px;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
