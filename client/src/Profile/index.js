import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";

import styled from "styled-components";
import { Loading } from "../Loading";
import { FiLogOut } from "react-icons/fi";
import { Outlet, NavLink } from "react-router-dom";
import { ModalContext } from "../ModalContext";

const Profile = () => {
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const [games, setGames] = useState({});
  const { setShowModal } = useContext(ModalContext);
  const { logout } = useAuth0();
  const navLinkStyle = {
    background: "inherit",
    fontSize: "24px",
    textDecoration: "none",
    color: "#9897a1",
  };
  useEffect(async () => {
    let isCancelled = false;

    if (currentUser) {
      if (currentUser && !isCancelled) {
        const gamesData = await fetch(
          "https://mapguesser-server.herokuapp.com/api/getPlayerGames",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ games: currentUser.maps }),
          }
        );
        const parsedGamesData = await gamesData.json();

        const likesData = await fetch(
          "https://mapguesser-server.herokuapp.com/api/getPlayerGames",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ games: currentUser.likes }),
          }
        );

        const parsedLikesData = await likesData.json();
        setGames({
          ...games,
          created: parsedGamesData.data,
          liked: parsedLikesData.data,
        });
      }
    }
    return () => {
      setShowModal(false);
    };
  }, [currentUser]);

  const deleteGame = async (_id) => {
    await fetch(
      `https://mapguesser-server.herokuapp.com/api/deleteGame/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    fetch("https://mapguesser-server.herokuapp.com/api/removeFromUser", {
      method: "PUT",
      body: JSON.stringify({ gameid: _id, user: currentUser._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {});
  };

  return (
    <ScrollContainer>
      {isAuthenticated && currentUser && games.liked && games.created ? (
        <Container>
          <TopWrapper style={{ margin: "10px 8px 5px" }}>
            <img
              src={currentUser.picture}
              alt={currentUser.name}
              style={{ borderRadius: "20%" }}
              referrerPolicy="no-referrer"
            ></img>
            <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>
              {currentUser.givenName + " " + currentUser.lastName}
            </h2>
            <p style={{ margin: "3px 0 6px" }}>{currentUser.email}</p>
            <p style={{ margin: "3px 0 6px", fontWeight: "bolder" }}>
              Total all-time score: {currentUser.score}
            </p>
            <Logout
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <FiLogOut />
              Sign Out
            </Logout>
          </TopWrapper>
          <Choose style={{ marginTop: "10px", marginBottom: "0" }}>
            <NavLink
              end
              to="/profile"
              style={({ isActive }) =>
                isActive ? { ...navLinkStyle, color: "white" } : navLinkStyle
              }
            >
              Liked Maps
            </NavLink>
            <span style={{ fontSize: "30px", color: "white" }}>|</span>
            <NavLink
              end
              to="/profile/created"
              style={({ isActive }) =>
                isActive ? { ...navLinkStyle, color: "white" } : navLinkStyle
              }
            >
              Created Maps
            </NavLink>
            <span style={{ fontSize: "30px", color: "white" }}>|</span>

            <NavLink
              end
              to="/profile/active"
              style={({ isActive }) =>
                isActive ? { ...navLinkStyle, color: "white" } : navLinkStyle
              }
            >
              Active Games{" "}
            </NavLink>
          </Choose>
          <Outlet context={[games, currentUser, deleteGame]} />
        </Container>
      ) : (
        <Loading />
      )}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 44px);
  overflow-y: auto;
  background-size: cover;
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/287620190-huge.jpg");
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopWrapper = styled.div`
  color: white;
`;

const Choose = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
`;

const Logout = styled.button`
  font-weight: bold;
  border-radius: 5px;
  border: solid white 1px;
  background: none;
  display: flex;
  padding: 4px;
  align-items: center;
  /* color: #9897a1; */
  color: white;
`;

export default Profile;
