import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {FiHeart} from "react-icons/fi";
// import {userInfo} from "os";
import {UserContext} from "./UserContext";
import Game from "./Game";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import {GameContext} from "./GameContext";

const Homepage = () => {
  const [games, setGames] = useState(null);
  const [liked, setLiked] = useState(null);
  const [updatePage, setUpdatePage] = useState(false);
  const {currentUser, isAuthenticated, loggedOut} = useContext(UserContext);
  const {setSelected, setTimed} = useContext(GameContext);

  useEffect(() => {
    fetch("/getGames")
      .then((res) => res.json())
      .then((res) => {
        console.log("this thing", res);
        setGames(res.result);
      });
    setSelected(null);
    setTimed(null);
  }, [currentUser, updatePage]);

  // const likeGame = () =>{
  //   fetch(`/likeGame/${_id}`)
  // }
  console.log("currentUser", currentUser);
  console.log(games);

  if (!currentUser || !games) {
    return "loading";
  }

  // console.log("thingy", currentUser.givenName + " " + currentUser.lastName);

  return (
    <>
      {currentUser && games && (
        <Container>
          {/* <Link to={"/CreateMapForm"}>Create Map</Link> */}
          {games.map((game, index) => {
            let isLiked = false;
            // console.log(game.pic);
            if (currentUser.likes.includes(game._id)) {
              isLiked = true;
            }
            return (
              <Game
                game={game}
                isLiked={isLiked}
                key={Math.random() * 99999}
                updatePage={updatePage}
                setUpdatePage={setUpdatePage}
              />
            );
          })}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  /* background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(12, 20, 42, 1) 100%
  ); */
  /* background: #17389c; */
  background: linear-gradient(
    90deg,
    rgba(23, 56, 156, 1) 0%,
    rgba(24, 30, 87, 1) 100%
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
