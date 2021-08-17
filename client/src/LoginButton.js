import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import {FiLogIn} from "react-icons/fi";

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  //   console.log(user);

  return (
    <Login onClick={() => loginWithRedirect()}>
      <LoginIcon />
      <LoginLabel>Log In</LoginLabel>
    </Login>
  );
};

export default LoginButton;

const Login = styled.button`
  background: none;
  background-color: none;
  color: #5a7bb0;
  border: none;
  display: flex;
  align-items: center;
  font-size: 20px;
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

const LoginLabel = styled.span`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;
