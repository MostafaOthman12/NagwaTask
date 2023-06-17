const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(cors());
app.get("/words", (req, res) => {
  // read Json file
  fs.readFile("TestData.json", "utf8", (err, data) => {
    //error handling
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    //parse Json data
    const jsonData = JSON.parse(data);
    const wordList = jsonData.wordList;

    // Select random 10 word with the given critiria
    const selectedWords = selectRandomWords(wordList, 10);

    // Send the selectedWords as the response
    res.json(selectedWords);
  });
});

function selectRandomWords(wordList, count) {
  // sort array in random order
  const shuffledWords = wordList.sort(() => 0.5 - Math.random());
  const isMatching = isMatchWordCritiria(shuffledWords.slice(0, count));
  if (isMatching) return shuffledWords.slice(0, count);
  selectRandomWords(wordList, count);
}

function isMatchWordCritiria(selectedWords) {
  // Check for the critiria
  const hasAdjective = selectedWords.some((word) => word.pos === "adjective");
  const hasAdverb = selectedWords.some((word) => word.pos === "adverb");
  const hasNoun = selectedWords.some((word) => word.pos === "noun");
  const hasVerb = selectedWords.some((word) => word.pos === "verb");
  return !hasAdjective || !hasAdverb || !hasNoun || !hasVerb ? false : true;
}

app.get("/rank", (req, res) => {
  fs.readFile("TestData.json", "utf8", (err, data) => {
    //error handling
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const jsonData = JSON.parse(data);
    const RankList = jsonData.scoresList;
    res.json(RankList);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
