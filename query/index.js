import express from "express";
import cors from "cors";

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, postId, content } = data;
    posts[postId].comments.push({ id, content });
  }

  res.send({});
});

app.listen(4002, () => {
  console.log(`query service is running on 4002`);
});
