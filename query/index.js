import express from "express";
import cors from "cors";
import axios from "axios";

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
  handleEvent(type, data);
  res.send({});
});

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, postId, content, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const comment = posts[postId].comments.find((c) => c.id === id);
    comment.content = content;
    comment.status = status;
  }
};

app.listen(4002, async () => {
  console.log(`query service is running on 4002`);

  // pick all the previous events occurred when query was down
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
    for (let event of res.data) {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
