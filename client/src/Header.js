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
      <div>Header</div>
      <LoginButton>Log In</LoginButton>
      <LogoutButton>Log Out</LogoutButton>
      <button onClick={handleTest}>Test</button>
      {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
    </>
  );
};

export default Header;
