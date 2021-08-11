import React from "react";
import LoginButton from "./LoginButton";
import {NavLink, Link} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";
import {useAuth0} from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import styled from "styled-components";
import {FiUser, FiHome} from "react-icons/fi";
import {BiWorld} from "react-icons/bi";

const Header = ({handleTest}) => {
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <>
      <HeaderContainer>
        <Home to={"/"}>
          <HomeIcon size={"25px"} />
          <NavName>Home</NavName>
        </Home>
        <Create to={"/CreateMapForm"}>
          <BiWorld size={"25px"} />
          <NavName>Create Map</NavName>
        </Create>
        {isAuthenticated && (
          <ProfileLink to="/profile">
            <ProfileIcon size={"25px"} />
            <NavName>Profile</NavName>
          </ProfileLink>
        )}

        {isAuthenticated && <LogoutButton>Log Out</LogoutButton>}
        {!isAuthenticated && <LoginButton>Log In</LoginButton>}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 44px;
  background: #7a7280;
  background: #87a1c4;
  background-color: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: space-between;
  @media (min-width: 700px) {
    height: 44px;
  }
`;
const NavName = styled.span`
  color: #5a7bb0;
  font-size: 20px;
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;

const Home = styled(NavLink)`
  color: #5a7bb0;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 0 10px 0;
  @media (min-width: 700px) {
    margin: 0 60px 0;
    display: flex;
  }
`;

const HomeIcon = styled(FiHome)`
  color: #5a7bb0;
`;

const Create = styled(NavLink)`
  color: #5a7bb0;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
  color: #5a7bb0;
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled(FiUser)``;

const Logout = styled(LogoutButton)`
  margin-right: 20px;
  color: green;
`;
