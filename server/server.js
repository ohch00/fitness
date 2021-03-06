const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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
const workoutsRouter = require('./routes/workouts');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});