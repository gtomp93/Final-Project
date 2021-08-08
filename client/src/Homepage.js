import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    fetch("/getGames")
      .then((res) => res.json())
      .then((res) => {
        console.log("this thing", res);
        setGames(res.result);
      });
  }, []);

  console.log(games);

  if (!games) {
    return "loading";
  }

  return (
    <div style={{marginLeft: "20px"}}>
      <div>Home</div>
      <div style={{width: "100px", height: "50px", border: "solid black 1px"}}>
        <Link to={"/gameOptions/worldTour"}>World Tour</Link>
      </div>
      <div style={{width: "100px", height: "50px", border: "solid black 1px"}}>
        <Link to={"/gameOptions/worldTour"}>Canada</Link>
      </div>
      <div style={{width: "100px", height: "50px", border: "solid black 1px"}}>
        <Link to={"/gameOptions/worldTour"}>Cities</Link>
      </div>
      <Link to={"/CreateMapForm"}>Create Map</Link>
      {games.map((game) => {
        console.log(game.pic);
        return (
          <GameContainer>
            <div>{game.name}</div>
            <GamePic src={game.pic}></GamePic>
            <div>{game.description}</div>
          </GameContainer>
        );
      })}
    </div>
  );
};

const GameContainer = styled.div``;

const GamePic = styled.img`
  width: 50px;
  display: block;
`;

export default Homepage;
