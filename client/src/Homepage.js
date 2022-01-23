import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
// import {userInfo} from "os";
import { UserContext } from "./UserContext";
import Game from "./Game";
import LogoutButton from "./LogoutButton";
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

  const FilterGames = (selectedGames) => {
    let copy = [];
    copy.push(selectedGames);
    setGames(copy);
  };

  if (!currentUser || !games) {
    return <Loading />;
  }

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
              style={{ marginTop: "18px", color: "black" }}
            />
            <h1 style={{ marginBottom: "0", color: "#d3d2d9" }}> MapGuesser</h1>
          </div>
          {/* <img
            src={
              "https://google-maps-bucket.s3.us-east-2.amazonaws.com/7353482103f5a33da92399411dd17d24"
            }
          /> */}

          <SearchWrapper>
            <Search
              onChange={(ev) => {
                setSearchValue(ev.target.value);
                if (ev.target.value.length > 1) {
                  let arr = games.filter((game) => {
                    return game.name
                      .toLowerCase()
                      .includes(ev.target.value.toLowerCase());
                  });
                  setGamesList(arr);
                } else {
                  setGamesList([]);
                }
              }}
              value={searchValue}
              placeholder="Search Maps"
              disabled={searched}
            />
            {searchValue.length > 1 && !searched && (
              <SuggestionsList>
                {gamesList.map((game) => {
                  return (
                    <Suggestion
                      onClick={() => {
                        FilterGames(game);
                        setSearched(true);
                      }}
                    >
                      {game.name}
                    </Suggestion>
                  );
                })}
              </SuggestionsList>
            )}
            {!searched && (
              <SearchButton
                onClick={() => {
                  setGames(gamesList);
                  setSearched(true);
                }}
              >
                <FiSearch style={{ color: "#5a7bb0" }} />
              </SearchButton>
            )}
            {searched && (
              <ResetButton
                onClick={() => {
                  setGames(fullList);
                  setSearched(false);
                  setSearchValue("");
                }}
              >
                Reset
              </ResetButton>
            )}
          </SearchWrapper>
          {/* <Link to={"/CreateMapForm"}>Create Map</Link> */}
          <GamesGrid>
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
        </Container>
      )}
    </>
  );
};

const GamesGrid = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Search = styled.input`
  width: 160px;
  background-color: #d3d2d9;
  border: solid black 1px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgb(255 255 255 / 10%);
  height: 21px;
`;

const SuggestionsList = styled.div`
  width: 155px;
  position: absolute;
  left: 0;
  top: 23px;
  z-index: 10;
  background-color: #d3d2d9;
  padding: 0 4px 0;
  border: solid grey 1px;
  /* box-sizing: border-box; */
`;

const Suggestion = styled.div`
  font-weight: bold;
  margin: 4px 0 4px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    color: #4e86f5;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  position: relative;
  margin-left: 3px;
  align-items: center;
  font-weight: bold;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  /* padding: 0px 8px 0px; */
  border-radius: 6px;
  /* background: #e8e6df; */
  border: none;
  height: 25px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.87);
  /* background-color: #07024d; */
  border-radius: 6px;
  /* color: #5a7bb0; */
  margin-left: 1px;
  color: #d3d2d9;
  &:hover {
    cursor: pointer;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  /* padding: 0px 8px 0px; */
  border-radius: 6px;
  /* background: #e8e6df; */
  border: none;
  height: 25px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.87);
  /* background-color: #07024d; */
  border-radius: 6px;
  /* color: #5a7bb0; */
  margin-left: 1px;
  color: #5a7bb0;
  &:hover {
    cursor: pointer;
  }
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
