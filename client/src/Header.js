import React from "react";
import LoginButton from "./LoginButton";
import {NavLink} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const Header = ({handleTest}) => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <>
      <LoginButton>Log In</LoginButton>
      <LogoutButton>Log Out</LogoutButton>
      {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
    </>
  );
};

export default Header;
