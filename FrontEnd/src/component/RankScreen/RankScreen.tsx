import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type RankScreenProps = {
  score: number;
  totalQuestions: number;
};

const RankScreen = ({ score, totalQuestions }: RankScreenProps) => {
  const [scoresList, setScoreList] = useState<number[]>([]);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get("http://localhost:3000/rank");
      setScoreList(response.data);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };
  const calculateRank = (): number => {
    console.log("scoreList", scoresList);
    console.log("score", score);
    const belowScores = scoresList.filter((s) => s < score);
    console.log("belowScores", belowScores);
    const rankPercentage = (belowScores.length / scoresList.length) * 100;
    return Math.round(rankPercentage * 100) / 100;
  };

  const rank = calculateRank();

  return (
    <div>
      <h2>Rank Screen</h2>
      <p>Score: {score}</p>
      <p>Rank: {rank}%</p>
      <Link className="btn btn-success" to="/">
        Try Again
      </Link>
    </div>
  );
};

export default RankScreen;
