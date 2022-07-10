import React from "react";
import LoginButton from "./LoginButton";
import { NavLink, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { BiWorld, BiMap } from "react-icons/bi";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <HeaderContainer>
        {isAuthenticated && (
          <Create to={"/CreateMapForm"}>
            <BiMap size={"25px"} />
            <Nav>{isAuthenticated ? "Create Map" : "MapGuesser"}</Nav>
          </Create>
        )}
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            color: "rgba(0, 0, 0, 0.87)",
            margin: "10px 0",
          }}
          to="/"
        >
          <BiWorld size={"40px"} style={{ color: "#5a7bb0" }} />
          <h1 style={{ marginBottom: "0", color: "#5a7bb0" }}> MapGuesser</h1>
        </Link>
        <SearchWrapper to="/explore">
          <FiSearch style={{ color: "#5a7bb0" }} size={25} />
          <Nav>Explore</Nav>
        </SearchWrapper>
        {isAuthenticated && (
          <ProfileLink to="/profile">
            <ProfileIcon size={"25px"} />
            <Nav>Profile</Nav>
          </ProfileLink>
        )}

        {!isAuthenticated && <LoginButton>Log In</LoginButton>}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 44px;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: space-around;
  z-index: 20;
  @media (min-width: 700px) {
    height: 44px;
  }
`;

const Nav = styled.span`
  color: #5a7bb0;
  font-weight: bolder;
  font-size: 25px;
  display: none;
  text-decoration: none;
  @media (min-width: 800px) {
    display: block;
  }
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
  margin: 0 10px 0 0;
  @media (min-width: 700px) {
    margin: 0;
  }
`;

const ProfileIcon = styled(FiUser)``;

const SearchWrapper = styled(Link)`
  display: flex;
  position: relative;
  margin-left: 3px;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
`;
