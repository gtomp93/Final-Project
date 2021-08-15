const express = require("express");
const morgan = require("morgan");
const PORT = 8000;
const cors = require("cors");
const {
  addUser,
  checkForUser,
  getLocations,
  updateUserScore,
  // getRandomLocations,
  searchOpponent,
  CreateGame,
  getGame,
  AddGameToUser,
  getGames,
  likeGame,
  addToLikes,
  removeGameFromUser,
  deleteGame,
  comment,
  getS3url,
} = require("./handlers");

// const {getS3url} = require("./s3");

const bodyParser = require("body-parser");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(cors())

  .post("/users", addUser)
  .post("/checkusers", checkForUser)
  .get("/getGames", getGames)
  .get("/getGame/:_id", getGame)
  .patch("/updateUserScore", updateUserScore)
  .get("/locations/:_id", getLocations)
  // .get("/RandomLocations/:_id", getRandomLocations)
  .get("/searchOpponent", searchOpponent)
  .post("/CreateGame", CreateGame)
  .delete("/deleteGame/:_id", deleteGame)
  .put("/addGameToUser", AddGameToUser)
  .put("/removeFromUser", removeGameFromUser)
  .put("/addLikeToUser/:_id", addToLikes)
  .patch("/likeGame/:_id", likeGame)
  .put("/comment/:_id", comment)
  .get("/s3url", getS3url)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`listen on PORT${PORT}`);
  });
