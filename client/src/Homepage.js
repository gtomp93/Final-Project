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
import {Loading} from "./Loading";
import {BiWorld} from "react-icons/bi";

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
    return <Loading />;
  }

  // console.log("thingy", currentUser.givenName + " " + currentUser.lastName);

  return (
    <>
      {currentUser && games && (
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            <BiWorld
              size={"50px"}
              style={{marginTop: "18px", color: "black"}}
            />
            <h1 style={{marginBottom: "0", color: "#d3d2d9"}}> MapGuesser</h1>
          </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
