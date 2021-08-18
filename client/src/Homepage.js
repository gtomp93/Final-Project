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
  const [searchValue, setSearchValue] = useState("");
  const {setSelected, setTimed} = useContext(GameContext);
  const [gamesList, setGamesList] = useState([]);
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
          <Search
            onChange={(ev) => {
              setSearchValue(ev.target.value);
              if (searchValue.length > 1) {
                let arr = games.filter((game) => {
                  return game.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                });
                setGamesList(arr);
              }
            }}
            value={searchValue}
          ></Search>
          <SuggestionsList>
            {gamesList.map((game) => {
              return (
                <Suggestion
                  onClick={() => {
                    FilterGames(game);
                  }}
                >
                  {game.name}
                </Suggestion>
              );
            })}
          </SuggestionsList>
          <SearchButton
            onClick={() => {
              setGames(gamesList);
            }}
          >
            Search
          </SearchButton>
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

const Search = styled.input``;

const SuggestionsList = styled.div``;

const Suggestion = styled.div``;

const SearchButton = styled.button``;

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
