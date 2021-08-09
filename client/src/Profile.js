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
    let arr = [];

    await currentUser.games.map((game, index) => {
      fetch(`/getGame/${game}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setGames((arr) => [...arr, res.result]);
        });
    });

    await currentUser.likes.map((game) => {
      fetch(`/getGame/${game}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setLikedGames((arr) => [...arr, res.result]);
        });
    });

    // setGames(arr);
  }, []);

  if (isLoading || !currentUser || !games.length) {
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
          let isLiked = currentUser.likes.includes(game._id);
          console.log(isLiked);
          return <Game game={game} isLiked={isLiked} />;
        })}
        <div>Liked Games</div>
        {likedGames.map((game) => {
          let isLiked = currentUser.likes.includes(game._id);
          console.log(isLiked);
          return <Game game={game} isLiked={isLiked} />;
        })}
      </>
    )
  );
};

export default Profile;
