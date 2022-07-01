import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";
import ProfileGame from "../ProfileGame";
import Game from "../Game";
import styled from "styled-components";
import { Loading } from "../Loading";
import LogoutButton from "../LogoutButton";
import { FiLogOut } from "react-icons/fi";
import { Outlet, useParams, NavLink } from "react-router-dom";

const Profile = ({ showModal, setShowModal }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const [games, setGames] = useState({});
  // const [showGames, setShowGames] = useState("liked");
  const { logout } = useAuth0();

  useEffect(async () => {
    let isCancelled = false;

    if (currentUser) {
      // await currentUser.games.map((game, index) => {
      //   fetch(`/getGame/${game}`)
      //     .then((res) => res.json())
      //     .then((res) => {
      //       // console.log(res);
      //       setGames((arr) => [...arr, res.result]);
      //     });
      // });

      // await currentUser.likes.map((game) => {
      //   if (game) {
      //     fetch(`/getGame/${game}`)
      //       .then((res) => res.json())
      //       .then((res) => {
      //         // console.log(res);
      //         setLikedGames((arr) => [...arr, res.result]);
      //       });
      //   }
      // });
      if (currentUser && !isCancelled) {
        console.log(currentUser.games);
        const gamesData = await fetch("/getPlayerGames", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ games: currentUser.games }),
        });
        const parsedGamesData = await gamesData.json();

        const likesData = await fetch("/getPlayerGames", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ games: currentUser.likes }),
        });

        const parsedLikesData = await likesData.json();
        setGames({
          ...games,
          created: parsedGamesData.data,
          liked: parsedLikesData.data,
        });
      }
    }
    return () => (isCancelled = true);
  }, [currentUser]);

  const deleteGame = async (_id) => {
    await fetch(`/deleteGame/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch("/removeFromUser", {
      method: "PUT",
      body: JSON.stringify({ gameid: _id, user: currentUser._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  console.log("games", games);

  // if (isLoading || !currentUser || !Object.values(games).length) {
  //   return <Loading />;
  // }

  console.log(games, "games");

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
            <GamesOption
              to="/profile"
              className={({ active }) => (active ? "active" : null)}
            >
              Liked Maps
            </GamesOption>
            <span style={{ fontSize: "30px", color: "white" }}>|</span>
            <GamesOption
              to="/profile/created"
              className={({ active }) => (active ? "active" : null)}
            >
              Created Maps
            </GamesOption>
          </Choose>
          <Outlet context={[games, currentUser, deleteGame]} />
          {/* <Liked created={created}>
          {likedGames.map((game) => {
            if (game) {
              let isLiked = currentUser.likes.includes(game._id);
              return (
                <Game
                  game={game}
                  isLiked={isLiked}
                  key={Math.random() * 9999}
                />
              );
            }
          })}
        </Liked> */}
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
`;

const GamesOption = styled(NavLink)`
  background: inherit;
  font-size: 24px;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &.active {
    color: "white";
    font-weight: "bold";
  }
`;

const Liked = styled.div`
  display: ${(props) => (props.created ? "none" : "block")};
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
