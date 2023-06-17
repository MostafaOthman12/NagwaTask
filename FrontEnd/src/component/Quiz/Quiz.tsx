import axios from "axios";
import React, { useEffect, useState } from "react";
import RankScreen from "../RankScreen/RankScreen";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";

import "./Quiz.css";

interface Word {
  id: number;
  word: string;
  pos: string;
}
export const Quiz = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Fetch words from server and set the words state
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get("http://localhost:3000/words");
      setWords(response.data);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const handleAnswerSelection = (selectedAnswer: string) => {
    // Update user's answer and check if it's correct
    setUserAnswer(selectedAnswer);
    const currentWord = words[currentWordIndex];
    const isCorrect = selectedAnswer === currentWord.pos;
    isCorrect ? setScore(score + 10) : setScore(score);
    // Update progress
    const answeredQuestions = currentWordIndex + 1;
    const calculatedProgress = (answeredQuestions / words.length) * 100;
    setProgress(calculatedProgress);

    // Move to the next word
    setCurrentWordIndex(currentWordIndex + 1);
  };

  if (currentWordIndex >= words.length) {
    return <RankScreen score={score} totalQuestions={words.length} />;
  }

  const currentWord = words[currentWordIndex];

  if (!currentWord) {
    // Handle the case when the currentWord is undefined
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Quiz</h1>
      <div className="Quiz">
        <h4>Choose the correct Answer</h4>
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="warning" variant="buffer" value={progress} />
        </Box>
        <p>{currentWord.word} Is A/An ?</p>
        <div>
          <button
            className="btn btn-warning m-2"
            onClick={() => handleAnswerSelection("noun")}
          >
            Noun
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={() => handleAnswerSelection("adverb")}
          >
            Adverb
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={() => handleAnswerSelection("adjective")}
          >
            Adjective
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={() => handleAnswerSelection("verb")}
          >
            Verb
          </button>
        </div>
      </div>
    </>
  );
};
