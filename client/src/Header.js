import React from "react";
import LoginButton from "./LoginButton";
import {NavLink, Link} from "react-router-dom";
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
        <NavLink to={"/CreateMapForm"}>Create Map</NavLink>

        {isAuthenticated && <LogoutButton>Log Out</LogoutButton>}
        {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 33px;
  background: #7a7280;
  background: #87a1c4;
  background-color: rgba(0, 0, 0, 0.87);
  display: flex;
`;
