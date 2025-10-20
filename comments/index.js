import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.json(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  // send comments created event to event-bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      postId: req.params.id,
      content,
      status: "pending",
    },
  });

  res.status(201).json(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);
  const { type, data } = req.body;
  const { id, content, postId, status } = data;
  if (type === "CommentModerated") {
    const comment = commentsByPostId[postId].find((c) => c.id === id);
    comment.status = status;

    // send comments updated event to event-bus
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log(`comments service is running on 4001`);
});
