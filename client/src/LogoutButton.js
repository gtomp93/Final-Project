import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import styled from "styled-components";
import {FiLogOut} from "react-icons/fi";

const LogoutButton = () => {
  const {logout} = useAuth0();

  return (
    <Logout onClick={() => logout({returnTo: window.location.origin})}>
      <LogoutIcon />
      <LogoutLabel>Log Out</LogoutLabel>
    </Logout>
  );
};

export default LogoutButton;

const Logout = styled.button`
  background: none;
  background-color: none;
  color: #5a7bb0;
  border: none;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bolder;
  margin-right: 10px;
  display: none;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 700px) {
    display: flex;
    margin-right: 60px;
  }
`;

const LogoutIcon = styled(FiLogOut)``;

const LogoutLabel = styled.span`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;
