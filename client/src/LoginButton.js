import React, { Children } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { FiLogIn } from "react-icons/fi";

const LoginButton = ({ children, errorLogin }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Login errorLogin={errorLogin} onClick={() => loginWithRedirect()}>
      <LoginIcon />
      {/* <LoginLabel>Log In</LoginLabel> */}
      <Label>{children}</Label>
    </Login>
  );
};

export default LoginButton;

const Login = styled.button`
  background: none;
  background-color: none;
  color: ${({ errorLogin }) => (errorLogin ? "#7bf716" : "#5a7bb0")};
  border: none;
  display: flex;
  align-items: center;
  font-size: ${({ errorLogin }) => (errorLogin ? "30px" : "20px")};
  margin-right: 10px;
  font-weight: bolder;
  &:hover {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    margin-right: 60px;
  }
`;

const LoginIcon = styled(FiLogIn)``;

const Label = styled.span``;
