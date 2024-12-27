// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;
require("dotenv").config();
const sendEmail = require('./utils/email')

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

    await sendEmail(newEmail, "subscribed to");
    res.status(200).send("successful");
    
  } catch(e){
    console.log(e)
    res.status(500).send('Setting up the email subscription failed');
  }
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
      await sendEmail(givenEmail, "unsubscribed from");
      res.status(200).send("delete successful");
    } else {
      // Email doesnt exist
      res.status(404).send('This email is not subscribed');
    }
  } catch(e){
    console.log(e)
    res.status(500).send('Deleting the email subscription failed');
  }
})

mongoose.connection.once('open', () => {
  console.log("connected to MongoDB")

  app.listen(PORT, () => {
    console.log("server running on port ", PORT)
  })
})

mongoose.connection.on('error', err => {
  console.log("Mongo Error: ", err)
})
