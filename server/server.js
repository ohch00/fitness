

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const firebase = require("firebase");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});