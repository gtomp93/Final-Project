import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {FiSearch} from "react-icons/fi";
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
  const [searchValue, setSearchValue] = useState("");
  const {setSelected, setTimed} = useContext(GameContext);
  const [gamesList, setGamesList] = useState([]);
  const [searched, setSearched] = useState(false);

  // let gamesList = [];

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
  // console.log(games);
  console.log(gamesList);

  const FilterGames = (selectedGames) => {
    console.log(selectedGames, "selectedGames");
    let copy = [];
    copy.push(selectedGames);
    setGames(copy);
  };

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
            />
            {searchValue.length > 1 && (
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
                <FiSearch style={{color: "#5a7bb0"}} />
              </SearchButton>
            )}
            {searched && (
              <ResetButton
                onClick={() => {
                  fetch("/getGames")
                    .then((res) => res.json())
                    .then((res) => {
                      console.log("this thing", res);
                      setGames(res.result);
                    });
                  setSearched(false);
                }}
              >
                Reset
              </ResetButton>
            )}
          </SearchWrapper>
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
`;

const ResetButton = styled.button``;

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
