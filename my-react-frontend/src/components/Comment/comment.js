// Comment.js
import React, { useState } from "react";

const Comment = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      <h2>Bình luận</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Viết bình luận..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <br />
        <button onClick={handleAddComment}>Gửi bình luận</button>
      </div>
    </div>
  );
};

export default Comment;
