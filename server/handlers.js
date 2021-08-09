const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;
const {v4: uuidv4} = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const checkForUser = async (req, res) => {
  try {
    const email = req.body;
    console.log(req.body);
    let doesNotExist = true;
    let userInfo = null;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("Final_Project");

    const result = await db.collection("Users").findOne(email);

    console.log("result", result);

    if (result) {
      console.log("FOUND IT");
      doesNotExist = false;
      userInfo = result;
    }

    console.log("doesNotExist", doesNotExist);

    res.status(200).json({status: 200, doesNotExist, userInfo});
    client.close();
  } catch (err) {
    res.status(404).json({status: 404});
  }
};

const addUser = async (req, res) => {
  try {
    const {email, givenName, lastName, picture} = req.body;
    // console.log(req.oidc);
    // let user = req.oidc.user;
    let _id = uuidv4();

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db
      .collection("Users")
      .insertOne({_id, email, givenName, lastName, picture, score: 0});
    console.log("result", result);
    res.status(200).json({status: 200, result});
    client.close();
  } catch (err) {
    console.log(err);
    res.status(404).json({status: 404});
  }
};

const getLocations = async (req, res) => {
  try {
    const {_id} = req.params;
    console.log("id", _id);
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db.collection("Game_Modes").findOne({_id});
    console.log("result", result);

    const {locations} = result;

    let arr = [];
    while (arr.length < 5) {
      var r = Math.floor(Math.random() * locations.length);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);

    const randomLocations = arr.map((num) => {
      return locations[num];
    });

    console.log(locations);
    res.status(200).json({status: 200, randomLocations});
    client.close();
  } catch (err) {
    res.status(404).json({status: 404, message: "not found"});
    console.log(err);
  }
};

const getRandomLocations = async (req, res) => {
  const {_id} = req.params;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("Final_Project");

  const Game_Modes = db.collection;

  const result = await db.collection("Game_Modes").findOne({_id});

  // const result = Game_Modes.aggregate([{$unwind: "$locations"}]);
  console.log("result", result);
  console.log(result[0]);

  res.status(200).json({status: 200, result});
  client.close();
};

const updateUserScore = async (req, res) => {
  try {
    const {score, _id} = req.body;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db
      .collection("Users")
      .updateOne({_id}, {$inc: {score: score}});

    console.log(result);

    res.status(400).json({status: 200, result});

    client.close();
  } catch (err) {
    console.log(err);
  }
};

const CreateGame = async (req, res) => {
  try {
    const {name, description, pic, locations} = req.body;

    let _id = uuidv4();

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");
    const result = await db
      .collection("Game_Modes")
      .insertOne({_id, name, description, pic, locations});

    res.status(200).json({status: 200, _id, result});
    client.close();
  } catch (err) {
    res.status(404).json({err});
    console.log(err);
  }
};

const AddGameToUser = async (req, res) => {
  try {
    const {gameid, user} = req.body;
    console.log(req.body, "a");
    let _id = user;
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const newGame = {$push: {games: gameid}};

    const result = await db.collection("Users").updateOne({_id}, newGame);

    res.status(200).json({status: 200, result});
    client.close();
  } catch (err) {
    console.log(err);
  }
};

const getGames = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const result = await db.collection("Game_Modes").find().toArray();

    res.status(200).json({status: 200, result});
    client.close();
  } catch (err) {
    console.log(err);
  }
};

// const liked = false;

const likeGame = async (req, res) => {
  try {
    const {_id} = req.params;
    const {liked} = req.body;

    console.log(_id, liked);

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");

    const result = null;

    if (liked) {
      result = await db
        .collection("Game_Modes")
        .updateOne({_id}, {$inc: {likes: 1}});
    } else {
      result = await db
        .collection("Game_Modes")
        .updateOne({_id}, {$inc: {likes: -1}});
    }

    res.status(200).json({status: 200, result});
    client.close();
  } catch (err) {
    res.status(404).json({status: 404, message: "not found"});
  }
};

const addToLikes = async (req, res) => {
  try {
    const {_id} = req.params;
    const {likedGame, liked} = req.body;

    console.log(_id, likedGame, liked);
    // const newGame = {$push: {games: gameid}};
    // { $pull: { <field1>: <value|condition>

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Final_Project");
    const result = null;
    if (liked) {
      result = await db
        .collection("Users")
        .updateOne({_id}, {$push: {likes: likedGame}});
    } else if (!liked) {
      result = await db
        .collection("Users")
        .updateOne({_id}, {$pull: {likes: likedGame}});
    }

    res.status(200).json({status: 200, result});

    client.close();
  } catch (err) {
    res.status(404).json({status: 404, message: "Not Found"});
  }
};

const searchOpponent = (req, res) => {};

module.exports = {
  addUser,
  checkForUser,
  getLocations,
  updateUserScore,
  getRandomLocations,
  searchOpponent,
  CreateGame,
  getGames,
  AddGameToUser,
  likeGame,
  addToLikes,
};
