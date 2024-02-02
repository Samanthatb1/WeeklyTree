// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sendEmails = require('./logic/email');
const PORT = process.env.PORT || 3500;
require("dotenv").config();

// Mongo DB Atlas
const connectDB = require('./config/DBConnect');
const MongooseModel = require('./models/User');
connectDB();

// Setup server
const app = express();

app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);

// --------------------------------------
// --------- ROUTES ---------------------
// --------------------------------------

// ****************************
// @desc creates a new user (or updates if the user already exists)
// @route post /newUser
// ****************************
app.post("/newUser", async (req, res) => {
  const newEmail = req.body.email_id;
  const newLinks = req.body.links;

  try {
    const user = await MongooseModel.findOne({email_id : newEmail});
    if (user !== null){
      // if the email exists already then update their links
      await MongooseModel.updateOne({email_id : newEmail}, {links: newLinks})
    } else {
      // Insert one new user
      await MongooseModel.create({ email_id : newEmail, links: newLinks });
    }
  } catch(e){
    console.log(e)
    res.status(500).send('Setting up the email subscription failed');
  }

  res.status(200).send("successful");
})

// ****************************
// @desc deletes a user's email subscription
// @route delete /deleteUser
// ****************************
app.delete("/deleteUser", async (req, res) => {
  const givenEmail = req.body.email_id;

  try {
    const user = await MongooseModel.findOne({email_id : givenEmail})
    if (user !== null){
      // if the email exists then delete
      await MongooseModel.deleteOne({email_id : givenEmail});
    } else {
      // Email doesnt exist
      res.status(404).send('This email is not subscribed');
    }
  } catch(e){
    console.log(e)
    res.status(500).send('Deleting the email subscription failed');
  }

  res.status(200).send("delete successful");
})

// ****************************
// @desc keeps the backend alive
// @route get /keepAlive
// ****************************
app.get("/keepAlive", async (req, res) => {
  console.log("keep alive ping")

  const d = new Date();
  let day = d.getDay()

  const date = new Date(); 
  const now = date.getHours();

  console.log(day, now);
  if (day == 5 && now == 2 || 3){
      try {
      console.log("About to send")
      const allUsers = await MongooseModel.find({}).lean();
      await sendEmails(allUsers)
    } catch(e){
      console.log('Sending emails failed');
    }
  }

  res.status(200).send("successful");
})

// --------------------------------------
// --------------------------------------

// ****************************
// @desc sends all email subscriptions
// ****************************
// setInterval(async () => {
//   try {
//     const allUsers = await MongooseModel.find({}).lean();
//     await sendEmails(allUsers)
//   } catch(e){
//     console.log('Sending emails failed');
//   }
// }, (86400 + 43200)* 1000);

// --------------------------------------
// --------------------------------------
// --------------------------------------

mongoose.connection.once('open', () => {
  console.log("connected to MongoDB")

  app.listen(PORT, () => {
    console.log("server running on port ", PORT)
  })
})

mongoose.connection.on('error', err => {
  console.log("Mongo Error: ", err)
})
