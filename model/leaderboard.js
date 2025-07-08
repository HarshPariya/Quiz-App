const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  skipedQuestions: {
    type: Number,
    require: true
  }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
