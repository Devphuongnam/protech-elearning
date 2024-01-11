import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CommentList.css";

const CommentList = ({ courseId, reloadComments }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!courseId) {
      console.error("Invalid courseId:", courseId);
      return;
    }

    axios
      .get(`http://localhost:8081/api/courses/${courseId}/comments`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [courseId, reloadComments]);

  const formattedTime = comments.map(function (item) {
    var itemDateTime = new Date(item.created_at);

    item.formattedDate = itemDateTime
      .toISOString()
      .replace(/T/, " ")
      .replace(/\.\d+Z$/, "");

    return item;
  });

  return (
    <div className="comment-list">
      <h3>Danh sách bình luận</h3>
      <ul className="comment-list-container">
        {formattedTime.map((comment) => (
          <li key={comment.id}>
            <div className="comment-info">
              <span className="comment-author">{comment.user_name}</span>
              <span className="comment-date">{comment.formattedDate}</span>
            </div>
            <p className="comment-text">{comment.comment_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
