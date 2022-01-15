const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");
const { s3 } = require("./s3");
const { generateUploadURL } = require("./s3");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db("Final_Project");

const checkForUser = async (req, res) => {
  try {
    const email = req.body;
    let doesNotExist = true;
    let userInfo = null;

    await client.connect();

    const result = await db.collection("Users").findOne(email);

    if (result) {
      doesNotExist = false;
      userInfo = result;
    }

    res.status(200).json({ status: 200, doesNotExist, userInfo });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404 });
  }
};

const addUser = async (req, res) => {
  try {
    const { email, givenName, lastName, picture, likes, games, score } =
      req.body;

    let _id = uuidv4();

    await client.connect();

    result = await db.collection("Users").insertOne({
      _id,
      email,
      givenName,
      lastName,
      picture,
      likes,
      games,
      score,
    });
    res.status(200).json({ status: 200, updated: _id });
    client.close();
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404 });
  }
};

const getLocations = async (req, res) => {
  try {
    const { _id } = req.params;

    await client.connect();

    const result = await db.collection("Game_Modes").findOne({ _id });

    const { locations } = result;

    let arr = [];
    while (arr.length < 5) {
      var r = Math.floor(Math.random() * locations.length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    const randomLocations = arr.map((num) => {
      return locations[num];
    });

    res.status(200).json({ status: 200, randomLocations });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404, message: "not found" });
    console.log(err.stack);
  }
};

const getGame = async (req, res) => {
  try {
    const { _id } = req.params;

    await client.connect();

    // const Game_Modes = db.collection;

    const result = await db.collection("Game_Modes").findOne({ _id });

    // const result = Game_Modes.aggregate([{$unwind: "$locations"}]);

    res.status(200).json({ status: 200, result });
    client.close();
  } catch (err) {
    console.log(err);
  }
};

const updateUserScore = async (req, res) => {
  try {
    const { score, _id } = req.body;

    await client.connect();

    await db.collection("Users").updateOne({ _id }, { $inc: { score: score } });

    res.status(200).json({ status: 200, updated: _id });

    client.close();
  } catch (err) {
    console.log(err);
  }
};

const CreateMap = async (req, res) => {
  try {
    const { name, description, pic, locations, creator, comments } = req.body;

    let _id = uuidv4();

    await client.connect();
    const result = await db
      .collection("Game_Modes")
      .insertOne({ _id, name, description, pic, locations, creator, comments });

    res.status(200).json({ status: 200, _id, result });
    client.close();
  } catch (err) {
    res.status(404).json({ err });
    console.log(err);
  }
};

const deleteGame = async (req, res) => {
  try {
    const { _id } = req.params;

    await client.connect();

    // const Game_Modes = db.collection;

    await db.collection("Game_Modes").deleteOne({ _id });
    // const result = Game_Modes.aggregate([{$unwind: "$locations"}]);

    res.status(204).json({ status: 200, deleted: _id });
    client.close();
  } catch (err) {
    console.log(err);
  }
};

const createGame = async (req, res) => {
  const { locations, player, mode, timeMode, icon } = req.body;
  console.log(locations, mode);
  try {
    await client.connect();
    const _id = uuidv4();
    let result = null;

    console.log(player);

    let newMultiplayerGame = {
      _id,
      type: "multi",
      locations: locations,
      timeMode,
      players: [{ player, icon, gameData: [], guessed: false }],
    };

    console.log(newMultiplayerGame);

    if (mode === "multi")
      result = await db.collection("Games").insertOne(newMultiplayerGame);

    if (mode === "single") {
      result = await db.collection("Games").insertOne({
        _id,
        type: "single",
        guessed: false,
        player,
        locations: locations,
        gameData: [],
        timeMode,
      });
    }

    res.status(200).json({ status: 200, gameId: _id });

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const submitGuess = async (req, res) => {
  try {
    const {
      mode,
      _id,
      score,
      distance,
      ans,
      guess,
      zoom,
      center,
      thirdPoint,
      player,
      midPoint,
    } = req.body;

    // console.log(req.body);

    let result = null;
    await client.connect();

    if (mode === "single") {
      result = await db.collection("Games").updateOne(
        { _id },
        {
          $push: {
            gameData: {
              score,
              distance,
              zoom,
              center,
              polyline: { ans, guess, thirdPoint },
            },
          },
          $set: { guessed: true },
        }
      );
    }

    if (mode === "multi") {
      console.log("aightt");
      result = await db.collection("Games").updateOne(
        { _id, "players.player": player },
        {
          $push: {
            "players.$.gameData": {
              score,
              distance,
              guess,
              thirdPoint,
              midPoint,
            },
          },
          $set: {
            "players.$.guessed": true,
          },
        }
      );
    }
    // console.log(result);
    res.status(200).json({ status: 200 });
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const nextLocation = async (req, res) => {
  try {
    const { mode, _id, player } = req.body;
    // console.log(req.body);
    await client.connect();
    if (mode === "single") {
      await db
        .collection("Games")
        .updateOne({ _id }, { $set: { gameStatus: { guessed: false } } });
    } else if (mode === "multi") {
      await db.collection("Games").updateOne(
        { _id, "players.player": player },
        {
          $set: {
            "players.$.guessed": false,
          },
        }
      );
    }
    res.status(200).json({ status: 200 });
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const retrieveMap = async (req, res) => {
  const { _id } = req.params;
  const {
    currentUser: { email, picture },
  } = req.body;
  console.log(email, picture, "player");
  await client.connect();

  let game = await db.collection("Games").findOne({ _id });

  if (
    game.type === "multi" &&
    !game.players.some((item) => item.player === email)
  ) {
    console.log("we in here");
    game.players.push({
      player: email,
      gameData: [],
      guessed: false,
      icon: picture,
    });
    //player
    const addUser = await db.collection("Games").updateOne(
      { _id },
      {
        $push: {
          players: {
            player: email,
            gameData: [],
            guessed: false,
            icon: picture,
          },
        },
      }
    );
  }

  let guessed = false;
  let locationIndex = 0;
  let points = 0;
  let endGame = false;
  let gameScore = 0;
  let timeMode = null;
  let distance = 0;
  let thirdPoint = null;
  let midPoint = { lat: 0, lng: 0 };
  let guess = null;
  let gameProgress = 0;
  let zoom = 2;
  let otherPlayerData = null;

  console.log(guessed, 1);

  if (game.type === "single") {
    gameProgress = game.gameData.length;
    endGame = gameProgress >= 5;
    game.gameData.forEach((round) => {
      gameScore + round.score;
    });

    if (game.guessed) {
      guessed = true;
      locationIndex = gameProgress - 1;
      distance = game.gameData[gameProgress - 1].distance;
      points = game[gameProgress - 1].score;
      guess = game.gameData[gameProgress - 1].guess;
      thirdPoint = game.gameData[gameProgress - 1].thirdPoint;
      midPoint = game.gameData[gameProgress - 1].midPoint;
    } else locationIndex = gameProgress;
  }
  if (game.type === "multi") {
    let playerGame = game.players.find((item) => item.player === email);
    console.log(playerGame, "playergame");
    gameProgress = playerGame.gameData.length;
    endGame = gameProgress >= 5;
    otherPlayerData = game.players.filter((user) => {
      return user.player !== email;
    });

    playerGame.gameData.forEach((round) => {
      gameScore += round.score;
    });
    if (playerGame.guessed) {
      guessed = true;
      console.log(guessed, 2);
      points = playerGame.gameData[gameProgress - 1].score;
      locationIndex = gameProgress - 1;
      distance = playerGame.gameData[gameProgress - 1].distance;
      thirdPoint = playerGame.gameData[gameProgress - 1].thirdPoint;
      guess = playerGame.gameData[gameProgress - 1].guess;
      midPoint = playerGame.gameData[gameProgress - 1].midPoint;
    } else locationIndex = gameProgress;
  }

  if (guessed) {
    if (distance > 3000000) {
      console.log("heeeere");
      zoom = 1;
    } else if (distance > 1000000 && (guess.lat > 58 || guess.lat < -58)) {
      zoom = 2;
    } else if (distance > 1750000) {
      zoom = 2;
    } else if (distance > 1000000) {
      zoom = 3;
    } else if (distance > 500000) {
      zoom = 4;
    } else if (distance > 200000) {
      zoom = 5;
    } else if (distance > 100000) {
      zoom = 6;
    } else if (distance > 50000) {
      zoom = 7;
    } else if (distance > 20000) {
      zoom = 8;
    } else if (distance > 5000) {
      zoom = 9;
    } else if (distance > 1000) {
      zoom = 10;
    } else {
      zoom = 11;
    }
  }
  console.log({
    points,
    timeMode,
    endGame,
    gameScore,
    locationIndex,
    distance,
    guessed,
    thirdPoint,
    guess,
    midPoint,
    playerMode: game.type,
    locations: game.locations,
    zoom,
    otherPlayerData,
  });

  res.status(200).json({
    status: 200,
    data: {
      locationIndex,
      playerMode: game.type,
      locations: game.locations,
      guessed,
      points,
      endGame,
      gameScore,
      timeMode: game.timeMode,
      points,
      distance,
      thirdPoint,
      guess,
      zoom,
      midPoint,
      otherPlayerData,
    },
  });
  client.close();
};

const loadOtherPlayers = async (req, res) => {
  const { _id, player } = req.params;

  await client.connect();

  let gameInfo = await db.collection("Games").findOne({ _id });
  console.log(gameInfo);
  let data = gameInfo
    ? gameInfo.players.filter((user) => {
        return user.player !== player;
      })
    : null;
  console.log(data, "data");
  if (!data.length) {
    data = null;
  }

  res.status(200).json({ status: 200, data });

  client.close();
};

const AddGameToUser = async (req, res) => {
  try {
    const { gameid, user } = req.body;
    let _id = user;

    await client.connect();

    const newGame = { $push: { games: gameid } };

    const result = await db.collection("Users").updateOne({ _id }, newGame);

    res.status(200).json({ status: 200, updated: _id });
    client.close();
  } catch (err) {
    console.log(err);
  }
};

const removeGameFromUser = async (req, res) => {
  try {
    const { gameid, user } = req.body;
    let _id = user;

    await client.connect();

    const newGame = { $pull: { games: gameid } };

    const result = await db.collection("Users").updateOne({ _id }, newGame);

    res.status(200).json({ status: 200, updated: _id });
    client.close();
  } catch (err) {
    console.log(err);
  }
};

const getGames = async (req, res) => {
  try {
    await client.connect();

    const result = await db.collection("Game_Modes").find().toArray();

    res.status(200).json({ status: 200, result });
    client.close();
  } catch (err) {
    console.log(err);
  }
};

// const liked = false;

const likeGame = async (req, res) => {
  try {
    const { _id } = req.params;
    const { liked } = req.body;

    await client.connect();

    if (liked) {
      await db
        .collection("Game_Modes")
        .updateOne({ _id }, { $inc: { likes: 1 } });
    } else {
      await db
        .collection("Game_Modes")
        .updateOne({ _id }, { $inc: { likes: -1 } });
    }

    res.status(200).json({ status: 200, updated: _id });
    client.close();
  } catch (err) {
    res.status(404).json({ status: 404, message: "not found" });
    console.log(err);
  }
};

const comment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { comment, commentBy, pic } = req.body;

    await client.connect();

    await db
      .collection("Game_Modes")
      .updateOne({ _id }, { $push: { comments: { comment, commentBy, pic } } });

    client.close();
  } catch (err) {
    res.status(200).json({ err });
  }
};

const addToLikes = async (req, res) => {
  try {
    const { _id } = req.params;
    const { likedGame, liked } = req.body;

    // const newGame = {$push: {games: gameid}};
    // { $pull: { <field1>: <value|condition>

    await client.connect();
    const result = null;
    if (liked) {
      await db
        .collection("Users")
        .updateOne({ _id }, { $push: { likes: likedGame } });
    } else if (!liked) {
      await db
        .collection("Users")
        .updateOne({ _id }, { $pull: { likes: likedGame } });
    }

    res.status(200).json({ status: 200, result });

    client.close();
  } catch (err) {
    res.status(404).json({ status: 404, message: "Not Found" });
    console.log(err);
  }
};

const getPlayerGames = async (req, res) => {
  const { games } = req.body;
  try {
    await client.connect();
    const results = await db
      .collection("Game_Modes")
      .find({ _id: { $in: games } })
      .toArray();

    res.status(200).json({ status: 200, data: results });
  } catch (err) {
    res.status(404).json({ status: 404, message: "Not Found" });
    console.log(err.stack);
  }
};

const getS3url = async (req, res) => {
  try {
    const url = await generateUploadURL();
    console.log("url", url);
    res.status(200).json({ status: 200, url });
  } catch (err) {
    console.log(err);
  }
};

const searchOpponent = (req, res) => {};

module.exports = {
  addUser,
  checkForUser,
  getLocations,
  updateUserScore,
  // getRandomLocations,
  retrieveMap,
  submitGuess,
  nextLocation,
  searchOpponent,
  removeGameFromUser,
  deleteGame,
  CreateMap,
  createGame,
  getGame,
  getGames,
  AddGameToUser,
  likeGame,
  comment,
  addToLikes,
  getPlayerGames,
  getS3url,
  loadOtherPlayers,
};
