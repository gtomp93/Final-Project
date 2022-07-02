import React from "react";
import LoginButton from "./LoginButton";
import { NavLink, Link } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { FiSearch } from "react-icons/fi";
import Search from "./Search";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import styled from "styled-components";
import { FiUser, FiHome } from "react-icons/fi";
import { BiWorld, BiMap } from "react-icons/bi";

const Header = ({ handleTest, showModal, setShowModal }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
          {/* <Search showModal={showModal} setShowModal={setShowModal} /> */}
          <FiSearch style={{ color: "#5a7bb0" }} size={25} />
          <Nav>Explore</Nav>

          {/* )} */}
        </SearchWrapper>
        {isAuthenticated && (
          <ProfileLink to="/profile">
            <ProfileIcon size={"25px"} />
            <Nav>Profile</Nav>
          </ProfileLink>
        )}

        {/* {isAuthenticated && <LogoutButton>Log Out</LogoutButton>} */}
        {!isAuthenticated && <LoginButton>Log In</LoginButton>}
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 44px;
  /* z-index: -1; */

  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  /* background: #7a7280; */
  /* background: #87a1c4; */
  background-color: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: space-around;
  z-index: 20;
  @media (min-width: 700px) {
    height: 44px;
  }
`;
// const NavName = styled.span`
//   color: #5a7bb0;
//   font-weight: bolder;
//   font-size: 20px;
//   display: none;
//   @media (min-width: 700px) {
//     display: block;
//   }
// `;

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

const Home = styled(NavLink)`
  color: #5a7bb0;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin: 0 0 0 10px;
  @media (min-width: 700px) {
    margin: 0 0 0 60px;
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
  margin: 0 10px 0 0;
  @media (min-width: 700px) {
    margin: 0;
  }
`;

const ProfileIcon = styled(FiUser)``;

const Logout = styled(LogoutButton)`
  margin-right: 20px;
  color: green;
`;

const SuggestionsList = styled.div`
  width: 155px;
  position: absolute;
  left: 0;
  top: 23px;
  z-index: 10;
  background-color: #d3d2d9;
  padding: 0 4px 0;
  /* border: solid grey 1px; */
  /* box-sizing: border-box; */
`;

const Suggestion = styled.div`
  font-weight: bold;
  margin: 4px 0 4px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    color: #4e86f5;
  }
`;

const SearchWrapper = styled(Link)`
  display: flex;
  position: relative;
  margin-left: 3px;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  /* padding: 0px 8px 0px; */
  border-radius: 6px;
  /* background: #e8e6df; */
  border: none;
  height: 25px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.87);
  /* background-color: #07024d; */
  border-radius: 6px;
  /* color: #5a7bb0; */
  margin-left: 1px;
  color: #d3d2d9;
  &:hover {
    cursor: pointer;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  /* padding: 0px 8px 0px; */
  border-radius: 6px;
  /* background: #e8e6df; */
  border: none;
  height: 25px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.87);
  /* background-color: #07024d; */
  border-radius: 6px;
  /* color: #5a7bb0; */
  margin-left: 1px;
  color: #5a7bb0;
  &:hover {
    cursor: pointer;
  }
`;
