import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const post = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        content,
      }
    );
    setContent("");
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export { CommentCreate };
