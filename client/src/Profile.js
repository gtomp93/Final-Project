import React, {useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {UserContext} from "./UserContext";
import Game from "./Game";

const Profile = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();
  const {currentUser} = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [likedGames, setLikedGames] = useState([]);
  console.log(currentUser);
  console.log("games", games);

  useEffect(async () => {
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
  }, []);

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
      <>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div>Created Games</div>
        {games.map((game) => {
          if (game) {
            let isLiked = currentUser.likes.includes(game._id);
            console.log(isLiked);
            return (
              <div key={Math.random() * 9999}>
                <Game game={game} isLiked={isLiked} />
                <button
                  onClick={() => {
                    deleteGame(game._id);
                  }}
                >
                  Delete {game.name}
                </button>
              </div>
            );
          }
        })}
        <div>Liked Games</div>
        {likedGames.map((game) => {
          if (game) {
            let isLiked = currentUser.likes.includes(game._id);
            console.log(isLiked);
            return (
              <Game game={game} isLiked={isLiked} key={Math.random() * 9999} />
            );
          }
        })}
      </>
    )
  );
};

export default Profile;
