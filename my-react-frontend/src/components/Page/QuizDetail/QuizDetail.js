// QuizDetail.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import courses from "../course/data";
import "./QuizDetail.css";
import Header from "../../Header/Header";

function QuizDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id.toString() === courseId);
  const { quiz } = course;
  const totalquestions = quiz.questions.length;

  const [selectedOptions, setSelectedOptions] = useState({});
  if (!course) {
    return <div>Khoá học không tồn tại</div>;
  }

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: selectedOption,
    }));
  };
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctOption) {
        score += 1;
      }
    });
    return score;
  };

  if (quiz.length === 0) {
    return (
      <div style={{ color: "red" }}>
        Chưa có bài kiểm tra nào cho khoá học này.
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="quiz-detail">
        <h2>{quiz.title}</h2>
        <p>{quiz.description}</p>
        <form>
          {quiz.questions.map((question) => (
            <div key={question.id}>
              <p style={{ fontWeight: "bold" }}>{question.content}</p>
              {question.options.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={option.value}
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={selectedOptions[question.id] === option.value}
                    onChange={() =>
                      handleOptionChange(question.id, option.value)
                    }
                  />
                  <label htmlFor={option.value}>{option.text}</label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              alert(
                `Bạn đã trả lời đúng : ${calculateScore()}/${totalquestions}`
              )
            }
          >
            Nộp Bài
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuizDetail;
