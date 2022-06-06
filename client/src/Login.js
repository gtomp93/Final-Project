import React from "react";
import styled from "styled-components";
import { BiWorld } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <h1 style={{ color: "white" }}>MapGuesser</h1>
      <BiWorld size={"100px"} />
      <LoginButton onClick={() => loginWithRedirect()}>Login</LoginButton>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
  position: relative;
  z-index: 500;
`;

const LoginButton = styled.div`
  background-color: rgba(0, 0, 0, 0.87);
  font-weight: bolder;
  color: #5a7bb0;
  color: white;
  width: 50px;
  height: 30px;
  display: grid;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;
