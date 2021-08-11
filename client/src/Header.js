import React from "react";
import LoginButton from "./LoginButton";
import {NavLink} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import styled from "styled-components";

const Header = ({handleTest}) => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <>
      <HeaderContainer>
        {!isAuthenticated && <LoginButton>Log In</LoginButton>}
        {isAuthenticated && <LogoutButton>Log Out</LogoutButton>}
        {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 33px;
  background: #ddded5;
  display: flex;
`;
