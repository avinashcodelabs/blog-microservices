import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const post = await axios.post("http://localhost:30980/posts", {
      title,
    });
    setTitle("");
    console.log(post);
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export { PostCreate };
