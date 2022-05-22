import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import {userInfo} from "os";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { UserContext } from "./UserContext";
import Game from "./Game";
import LogoutButton from "./LogoutButton";
import Mountains from "./assets/Mountains.jpg";
import LoginButton from "./LoginButton";
import { GameContext } from "./GameContext";
import { Loading } from "./Loading";
import { BiWorld } from "react-icons/bi";

const Homepage = ({ showModal, setShowModal, location }) => {
  const { id } = useParams();

  const [games, setGames] = useState(null);
  const [updatePage, setUpdatePage] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  const { setSelected, dispatch, resetMap } = useContext(GameContext);
  const [gamesList, setGamesList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [fullList, setFullList] = useState(null);

  console.log(id);

  useEffect(() => {
    if (id) setShowModal(id);
  }, []);

  useEffect(() => {
    fetch("/getGames")
      .then((res) => res.json())
      .then((res) => {
        setGames(res.result);
        setFullList(res.result);
      });
    dispatch({ type: "clearGame" });
  }, [currentUser, updatePage]);

  return (
    <>
      <Container>
        {currentUser && games ? (
          <ParallaxWrapper>
            <Background src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/pexels-pixabay-87651.jpg" />

            <GamesGrid
            // onLoad={calculateHeight}
            >
              {games.map((game, index) => {
                let isLiked = false;
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
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                );
              })}
            </GamesGrid>
          </ParallaxWrapper>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  /* background: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: solid pink 10px; */
  /* background-image: url("https://www.istockphoto.com/photo/twilight-at-spirit-island-gm485371557-38624866"); */
  /* background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/pexels-pixabay-87651.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; */
  height: calc(100vh - 44px);
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
  perspective-origin: bottom;
  /* position: relative; */
  background: purple;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.6rem;
  margin: 25px 15px 0px;
  width: calc(100vw - 30px);
  @media (min-width: 800px) {
    width: calc(100% - 40px);
    width: 100%;
    gap: 2.1rem;
  }
`;

const ParallaxWrapper = styled.div`
  position: relative;
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: (auto - 44px); */
  width: 100%;
  transform-style: preserve-3d;
  z-index: -1;
  /* overflow: hidden; */
  /* background: pink; */
  /* border: solid cyan 15px; */
`;

const Background = styled.img`
  position: absolute;
  height: 67%;
  top: 0;
  width: 100vw;
  object-fit: cover;
  object-position: top;
  z-index: -1;
  overflow: hidden;
  transform: translateZ(-30px) scale(4);
  height: calc(30% - 30px);
  @media (min-width: 725px) {
    top: 200px;
    transform: translateZ(-20px) scale(3);
    height: calc(50.5% - 30px);
  }
  @media (min-width: 769px) {
    top: 500px;
    transform: translateZ(-20px) scale(3);
    height: calc(45% - 30px);
  }
  @media (min-width: 1117px) {
    top: 0px;
    height: 67%;
    transform: translateZ(-10px) scale(2);
  }
`;

const Likes = styled.span``;

export default Homepage;
