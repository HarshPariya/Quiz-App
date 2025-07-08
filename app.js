const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const leaderboardRoutes = require('./routes/leaderboard');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', leaderboardRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('MongoDB connection error: ', err);
});

module.exports = app;
