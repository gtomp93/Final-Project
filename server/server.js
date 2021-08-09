const express = require("express");
const morgan = require("morgan");
const PORT = 8000;
const {
  addUser,
  checkForUser,
  getLocations,
  updateUserScore,
  getRandomLocations,
  searchOpponent,
  CreateGame,
  AddGameToUser,
  getGames,
  likeGame,
  addToLikes,
} = require("./handlers");

const bodyParser = require("body-parser");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .use(bodyParser.json())

  .post("/users", addUser)
  .post("/checkusers", checkForUser)
  .get("/getGames", getGames)
  .patch("/updateUserScore", updateUserScore)
  .get("/locations/:_id", getLocations)
  .get("/RandomLocations/:_id", getRandomLocations)
  .get("/searchOpponent", searchOpponent)
  .post("/CreateGame", CreateGame)
  .put("/addGameToUser", AddGameToUser)
  .put("/addLikeToUser/:_id", addToLikes)
  .patch("/likeGame/:_id", likeGame)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`listen on PORT${PORT}`);
  });
