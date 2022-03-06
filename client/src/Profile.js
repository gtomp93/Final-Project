import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
import ProfileGame from "./ProfileGame";
import Game from "./Game";
import styled from "styled-components";
import { Loading } from "./Loading";
import LogoutButton from "./LogoutButton";
import { FiLogOut } from "react-icons/fi";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [likedGames, setLikedGames] = useState([]);
  const [created, setCreated] = useState(true);
  const { logout } = useAuth0();

  const toggleCreate = () => {
    setCreated(true);
  };

  const toggleLike = () => {
    setCreated(false);
  };

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
        setGames(parsedGamesData.data);

        const likesData = await fetch("/getPlayerGames", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ games: currentUser.likes }),
        });

        const parsedLikesData = await likesData.json();
        setLikedGames(parsedLikesData.data);
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

  console.log("currentUser", currentUser);

  if (isLoading || !currentUser || !games.length || !likedGames.length) {
    return <Loading />;
  }

  return (
    isAuthenticated && (
      <Container>
        <div style={{ margin: "10px 8px 5px" }}>
          <img
            src={currentUser.picture}
            alt={currentUser.name}
            style={{ borderRadius: "20%" }}
            referrerpolicy="no-referrer"
          ></img>
          <h2 style={{ marginBottom: "0px", marginTop: "5px" }}>
            {currentUser.givenName + " " + currentUser.lastName}
          </h2>
          <p style={{ margin: "3px 0 6px" }}>{currentUser.email}</p>
          <p style={{ margin: "3px 0 6px", fontWeight: "bolder" }}>
            Total all-time score: {currentUser.score}
          </p>
          <Logout onClick={() => logout({ returnTo: window.location.origin })}>
            <FiLogOut />
            Sign Out
          </Logout>
        </div>
        <Choose style={{ marginTop: "10px", marginBottom: "0" }}>
          <GamesOption
            onClick={toggleCreate}
            style={
              created
                ? { fontWeight: "bolder", color: "#e8e6df" }
                : { color: "#9897a1" }
            }
          >
            Created Maps
          </GamesOption>
          <span style={{ fontSize: "30px" }}>|</span>
          <GamesOption
            onClick={toggleLike}
            style={
              created
                ? { color: "#9897a1" }
                : { fontWeight: "bolder", color: "#e8e6df" }
            }
          >
            Liked Maps
          </GamesOption>
        </Choose>
        <Created created={created}>
          {games.map((game) => {
            if (game) {
              let isLiked = currentUser.likes.includes(game._id);
              return (
                <div
                  key={Math.random() * 9999}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <ProfileGame
                    game={game}
                    isLiked={isLiked}
                    deleteGame={deleteGame}
                  />
                </div>
              );
            }
          })}
        </Created>
        <Liked created={created}>
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
        </Liked>
      </Container>
    )
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Choose = styled.div`
  display: flex;
  align-self: center;
`;

const GamesOption = styled.button`
  background: inherit;
  font-size: 24px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const Created = styled.div`
  display: ${(props) => (props.created ? "block" : "none")};
`;

const Liked = styled.div`
  display: ${(props) => (props.created ? "none" : "block")};
`;

const Logout = styled.button`
  font-weight: bold;
  border-radius: 5px;
  border: solid black 1px;
  background: none;
  display: flex;
  align-items: center;
  /* color: #9897a1; */
  color: black;
`;

export default Profile;
