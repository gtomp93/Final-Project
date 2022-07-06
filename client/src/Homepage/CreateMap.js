import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { Container } from "./styledComponents";
import { SubTitle } from "./styledComponents";
const CreateMap = () => {
  let Navigate = useNavigate();

  const { currentUser, setStatus } = useContext(UserContext);
  return (
    <CreateContainer
      onClick={() => {
        if (currentUser) {
          Navigate("/CreateMapForm");
        } else {
          setStatus({ error: "create" });
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <SubTitle>Create Map</SubTitle>
      <Image src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1932939785.jpg" />
    </CreateContainer>
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

const CreateContainer = styled(Container)`
  &:hover {
    transform: scale(1.01);
  }
  transition: 400ms;
`;
