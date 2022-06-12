import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SubTitle } from "./styledComponents";
import { Container } from "./styledComponents";
import { FiMap } from "react-icons/fi";

const ExploreMaps = () => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate()}>
      <SubTitle>Explore Maps </SubTitle>
      <Image src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1867671289.jpg" />
    </Container>
  );
};

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 6px;
`;
// const Container = styled.div``;

export default ExploreMaps;
