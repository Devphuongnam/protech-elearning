import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css";

const CommentForm = ({ courseId, onCommentSubmit }) => {
  const [content, setContent] = useState("");
  const [user_id, setUser_id] = useState(null);
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8081/api/courses/${courseId}/comments`,
        { comment_text: content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log("Gửi bình luận thành công", content);
        // Gọi callback để cập nhật danh sách bình luận
        onCommentSubmit(response.data);
        // Xóa nội dung trong form sau khi gửi thành công
        setContent("");
      } else {
        console.error("Error creating comment:", response.data.error);
      }
    } catch (error) {
      console.error("Error during comment creation:", error);
    }
  };

  return (
    <div className="comment-form-container">
      <label>Nội Dung bình luận:</label>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="comment-textarea"
      />
      <button onClick={handleSubmit} className="comment-submit-btn">
        Gửi bình luận
      </button>
    </div>
  );
};

export default CommentForm;
