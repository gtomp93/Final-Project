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
      .insertOne({_id, email, givenName, lastName, picture});
    console.log("result", result);
    res.status(200).json({status: 200, result});
    client.close();
  } catch (err) {
    console.log(err);
    res.status(404).json({status: 404});
  }
};

module.exports = {addUser, checkForUser};
