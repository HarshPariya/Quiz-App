const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
require("dotenv").config();


app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected to atlas successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

mongoDb();

// Define Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const Board = mongoose.model("Board", leaderboardSchema);

// POST endpoint to save quiz results
app.post("/leaderboard", async (req, res) => {
  try {
    const { userName, score } = req.body;
    const newEntry = new Board({ userName, score });
    await newEntry.save();

    res.status(200).json({ message: "Score saved successfully!" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET endpoint to fetch top 5 leaderboard scores
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Board.find().sort({ score: -1 }).limit(5);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
