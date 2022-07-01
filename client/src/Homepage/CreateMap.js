import React from "react";
import styled from "styled-components";
import { Container } from "./styledComponents";
import { SubTitle } from "./styledComponents";
const CreateMap = () => {
  return (
    <Container>
      <SubTitle>Create Map</SubTitle>
      <Image src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1932939785.jpg" />
    </Container>
  );
};

export default CreateMap;

const Image = styled.img`
  width: 100%;
  height: 92%;
  object-fit: cover;
  /* object-position: ; */
  border-radius: 6px;
`;
