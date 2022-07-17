import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { Container } from "./styledComponents";
import { FiLogIn } from "react-icons/fi";

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <StyledContainer onClick={() => loginWithRedirect()}>
      <Wrapper>
        <Message>
          Sign in or sign up to play <FiLogIn style={{ marginLeft: "0px" }} />
        </Message>
      </Wrapper>
    </StyledContainer>
  );
};

export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 1149px) {
    min-height: 33vw;
  }
  height: 100%;
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1302294157.jpg");
  background-size: cover;
  background-position: center;
`;

const StyledContainer = styled(Container)`
  padding: 12px 12px 12px;
  &:hover {
    transform: scale(1.02);
  }
  transition: 200ms;
  cursor: pointer;
  min-height: 120px;
`;

const Message = styled.p`
  font-size: 35px;
  @media (max-width: 1266px) {
    font-size: 31px;
  }
  @media (max-width: 1149px) {
    font-size: 45px;
  }
  @media (max-width: 750px) {
    font-size: 7vw;
  }

  top: 20px;
  color: rgba(0, 0, 0, 0.8);
  color: darkblue;
  z-index: 3;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
