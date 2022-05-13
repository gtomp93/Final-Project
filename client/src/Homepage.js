import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

const Homepage = () => {
  const [games, setGames] = useState(null);
  const [updatePage, setUpdatePage] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState("");
  const { setSelected, dispatch, resetMap } = useContext(GameContext);
  const [gamesList, setGamesList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [fullList, setFullList] = useState(null);

  // let gamesList = [];

  const [gridHeight, setGridHeight] = useState(0);

  // let gridHeight = 0;
  let heightRef = useRef(null);
  // const calculateHeight = (e) => {
  //   // setGridHeight(e.target.clientHeight);
  //   console.log("happening");
  //   console.log("gridHeight", gridHeight);
  //   setGridHeight(e.target.offsetHeight);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      console.log(heightRef.current.offsetHeight);
      setGridHeight(heightRef.current.offsetHeight);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  console.log(gridHeight);

  useEffect(() => {
    fetch("/getGames")
      .then((res) => res.json())
      .then((res) => {
        setGames(res.result);
        setFullList(res.result);
      });
    dispatch({ type: "clearGame" });
  }, [currentUser, updatePage]);

  // const likeGame = () =>{
  //   fetch(`/likeGame/${_id}`)
  // }

  // const FilterGames = (selectedGames) => {
  //   let copy = [];
  //   copy.push(selectedGames);
  //   setGames(copy);
  // };

  if (!currentUser || !games) {
    return <Loading />;
  }

  return (
    <>
      {currentUser && games && (
        <Container>
          {/* <img src={Mountains} /> */}

          {/* {searched && (
              <ResetButton
                onClick={() => {
                  setGames(fullList);
                  setSearched(false);
                  setSearchValue("");
                }}
              >
                Reset
              </ResetButton>
            )} */}
          {/* <Link to={"/CreateMapForm"}>Create Map</Link> */}
          <ParallaxWrapper>
            {gridHeight && (
              <Background
                src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/pexels-pixabay-87651.jpg"
                gridHeight={gridHeight}
              />
            )}
            <GamesGrid
              // onLoad={calculateHeight}
              ref={heightRef}
              gridHeight={gridHeight}
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
                  />
                );
              })}
            </GamesGrid>
          </ParallaxWrapper>
        </Container>
      )}
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
                      background-size: contain;
                      background-position: center; */
  height: calc(100vh - 44px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
  perspective-origin: bottom;

  /* border: solid purple 10px; */

  /* transform: none; */
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.6rem;
  margin: 25px auto;
  width: calc(100% - 30px);
  /* transform: translateZ(5px) scale(0.5); */

  @media (min-width: 800px) {
    /* width: calc(100% - 40px); */
    width: 100%;
    gap: 2.1rem;
  }
  /* border: solid 1px red; */
  top: 0;
  left: 0;
  /* height: 100%; */
  width: 100%;
  z-index: 100;
  overflow: hidden;
  /* background: green; */
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
  /* background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/pexels-pixabay-87651.jpg");
  */
  position: absolute;
  height: 67%;
  /* max-height: ${({ gridHeight }) => `${gridHeight}px`}; */
  /* max-height: 2000px; */
  top: 0;
  width: 100%;
  object-fit: cover;
  object-position: top;
  z-index: -1;
  transform: translateZ(-10px) scale(2);
  z-index: -1;
  overflow: hidden;
  background: pink;
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
