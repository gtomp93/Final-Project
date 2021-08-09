import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {FiHeart} from "react-icons/fi";
// import {userInfo} from "os";
import {UserContext} from "./UserContext";
import Game from "./Game";

const Homepage = () => {
  const [games, setGames] = useState(null);
  const [liked, setLiked] = useState(null);
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    fetch("/getGames")
      .then((res) => res.json())
      .then((res) => {
        console.log("this thing", res);
        setGames(res.result);
      });
  }, []);

  // const likeGame = () =>{
  //   fetch(`/likeGame/${_id}`)
  // }

  console.log(games);

  if (!currentUser) {
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
      {games.map((game, index) => {
        let isLiked = false;
        console.log(game.pic);
        if (currentUser.likes.includes(game._id)) {
          isLiked = true;
        }
        return (
          <Game game={game} isLiked={isLiked} key={index} />
          // <GameContainer key={Math.ceil(Math.random() * 100) * index}>
          //   <Link to={`/gameOptions/${game._id}`}>{game.name}</Link>
          //   <GamePic src={game.pic}></GamePic>
          //   <div>{game.description}</div>
          //   <LikeButton onClick={()=>{setLiked(true)}}>
          //     <FiHeart style={liked ? {fill: "red"} : {fill: "none"}} />
          //   </LikeButton>

          //   <Likes>{game.likes ? game.likes : null}</Likes>
          // </GameContainer>
          //     );
          //   })}
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

const LikeButton = styled.button`
  background: inherit;
  border: none;
`;

const Likes = styled.span``;

export default Homepage;
