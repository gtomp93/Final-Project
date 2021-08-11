import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {FiHeart} from "react-icons/fi";
// import {userInfo} from "os";
import {UserContext} from "./UserContext";
import Game from "./Game";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

const Homepage = () => {
  const [games, setGames] = useState(null);
  const [liked, setLiked] = useState(null);
  const [updatePage, setUpdatePage] = useState(false);
  const {currentUser, isAuthenticated} = useContext(UserContext);

  useEffect(() => {
    fetch("/getGames")
      .then((res) => res.json())
      .then((res) => {
        console.log("this thing", res);
        setGames(res.result);
      });
  }, [currentUser, updatePage]);

  // const likeGame = () =>{
  //   fetch(`/likeGame/${_id}`)
  // }
  console.log("currentUser", currentUser);
  console.log(games);

  if (!currentUser) {
    return "loading";
  }

  console.log("currentUser.pic", currentUser.picture);

  console.log("thingy", currentUser.givenName + " " + currentUser.lastName);

  return (
    <Container>
      <Link to={"/CreateMapForm"}>Create Map</Link>
      {games.map((game, index) => {
        let isLiked = false;
        console.log(game.pic);
        if (currentUser.likes.includes(game._id)) {
          isLiked = true;
        }
        return (
          <>
            <Game
              game={game}
              isLiked={isLiked}
              key={index}
              updatePage={updatePage}
              setUpdatePage={setUpdatePage}
            />
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(12, 20, 42, 1) 100%
  );
`;

const GamePic = styled.img`
  width: 50px;
  display: block;
`;

const LikeButton = styled.button`
  background: inherit;
  border: none;
`;

const Likes = styled.span``;

export default Homepage;
