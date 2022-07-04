import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { Container, SubTitle } from "./styledComponents";
import { FiLogIn } from "react-icons/fi";

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <StyledContainer onClick={() => loginWithRedirect()}>
      <Wrapper>
        <Message>
          Sign in or sign up to play{" "}
          <FiLogIn style={{ display: "block", marginLeft: "8px" }} />
        </Message>
        <Img
          src={
            "https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1302294157.jpg"
          }
        />
      </Wrapper>
    </StyledContainer>
  );
};

export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  top: 0;

  /* padding: 12px; */
`;

const StyledContainer = styled(Container)`
  padding: 12px 12px 12px;
  &:hover {
    transform: scale(1.02);
  }
  transition: 200ms;
  cursor: pointer;
`;

const Message = styled.p`
  position: absolute;
  top: 0;
  color: rgba(0, 0, 0, 0.8);
  color: darkblue;
  z-index: 3;
  font-weight: bold;
  font-size: 36px;
  display: flex;
  align-items: center;
`;
