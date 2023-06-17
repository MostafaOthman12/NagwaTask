import React from "react";
import { Link } from "react-router-dom";
import exam from "../../assets/images/exam.svg";
import "./Banner.css";

export const Banner = () => {
  return (
    <div className="Banner">
      <article className="Banner-article">
        <h1>
          Tra<span>ck Your Pr</span>ogress
        </h1>
        <p>
          In English language, words can be categorized according to their
          syntactic functions, which is known as "Part of Speech"
        </p>
        <Link className="btn btn-success" to="/quiz">
          Enter Exam
        </Link>
      </article>
      <article className="Banner-image">
        <img src={exam} alt="" />
      </article>
    </div>
  );
};
