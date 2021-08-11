import React, {useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {UserContext} from "./UserContext";
import Game from "./Game";
import styled from "styled-components";

const Profile = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();
  const {currentUser} = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [likedGames, setLikedGames] = useState([]);
  const [created, setCreated] = useState(true);
  console.log(currentUser);
  console.log("games", games);

  const toggleCreate = () => {
    setCreated(true);
  };

  const toggleLike = () => {
    setCreated(false);
  };

  useEffect(async () => {
    if (currentUser) {
      await currentUser.games.map((game, index) => {
        fetch(`/getGame/${game}`)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setGames((arr) => [...arr, res.result]);
          });
      });

      await currentUser.likes.map((game) => {
        if (game) {
          fetch(`/getGame/${game}`)
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setLikedGames((arr) => [...arr, res.result]);
            });
        }
      });
    }
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
      body: JSON.stringify({gameid: _id, user: currentUser._id}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  if (
    isLoading ||
    !currentUser ||
    games.length < currentUser.games.length ||
    likedGames.length < currentUser.likes.length
  ) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Container>
        <div style={{margin: "10px 8px 5px"}}>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <Choose>
          <GamesOption
            onClick={toggleCreate}
            style={created ? {fontWeight: "bolder"} : null}
          >
            Created Games
          </GamesOption>
          <span style={{fontSize: "30px"}}>|</span>
          <GamesOption
            onClick={toggleLike}
            style={created ? null : {fontWeight: "bolder"}}
          >
            Liked Games
          </GamesOption>
        </Choose>
        <Created created={created}>
          {games.map((game) => {
            if (game) {
              let isLiked = currentUser.likes.includes(game._id);
              console.log(isLiked);
              return (
                <div
                  key={Math.random() * 9999}
                  style={{display: "flex", flexDirection: "column"}}
                >
                  <Game game={game} isLiked={isLiked} />
                  <button
                    onClick={() => {
                      deleteGame(game._id);
                    }}
                    style={{
                      width: "200px",
                      alignSelf: "center",
                      marginTop: "3px",
                    }}
                  >
                    Delete {game.name}
                  </button>
                </div>
              );
            }
          })}
        </Created>
        <Liked created={created}>
          {likedGames.map((game) => {
            if (game) {
              let isLiked = currentUser.likes.includes(game._id);
              console.log(isLiked);
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

export default Profile;
