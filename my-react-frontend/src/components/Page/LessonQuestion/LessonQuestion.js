import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./LessonQueston.css";
import Header from "../../Header/Header";

const LessonQuestion = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/courses/${id}/questions`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerSelect = (questionId, answer) => {
    // Chọn câu trả lời cho câu hỏi có id là questionId
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    // Tính điểm
    let currentScore = 0;
    questions.forEach((question) => {
      const questionId = question.questionId;
      const correctAnswer = question.correctAnswer;
      const selectedAnswer = selectedAnswers[questionId];

      if (selectedAnswer === correctAnswer) {
        currentScore += 1;
      }
    });

    // Cập nhật điểm và đánh dấu là đã submit
    setScore(currentScore);
    setSubmitted(true);
  };

  const handleRestart = () => {
    setScore(0);
    setSubmitted(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setRestart(true);
  };

  if (questions.length === 0) {
    return <div>Hiện khoá học này chưa có bài kiểm tra.</div>;
  }

  return (
    <div className="lesson-question">
      <Header />
      {questions.map((question) => (
        <div key={question.questionId} className="lesson-question-container">
          <h2>
            Câu {question.questionId}: {question.questionText}
          </h2>
          <ul>
            <li>
              <button
                onClick={() => handleAnswerSelect(question.questionId, "A")}
                className={
                  selectedAnswers[question.questionId] === "A" ? "selected" : ""
                }
                disabled={submitted}
              >
                {question.answerA}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAnswerSelect(question.questionId, "B")}
                className={
                  selectedAnswers[question.questionId] === "B" ? "selected" : ""
                }
                disabled={submitted}
              >
                {question.answerB}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAnswerSelect(question.questionId, "C")}
                className={
                  selectedAnswers[question.questionId] === "C" ? "selected" : ""
                }
                disabled={submitted}
              >
                {question.answerC}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAnswerSelect(question.questionId, "D")}
                className={
                  selectedAnswers[question.questionId] === "D" ? "selected" : ""
                }
                disabled={submitted}
              >
                {question.answerD}
              </button>
            </li>
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit} disabled={submitted}>
        Gửi câu trả lời
      </button>
      {submitted && (
        <p>
          Bạn đã trả lời đúng: {score} / {questions.length} câu
        </p>
      )}
      <button onClick={handleRestart} disabled={!submitted}>
        Làm lại
      </button>
    </div>
  );
};

export default LessonQuestion;
