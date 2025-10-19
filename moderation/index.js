import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    // send moderated comment to event-bus
    const { id, postId, content } = data;
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
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

app.listen(4003, () => {
  console.log(`moderation service is running on 4003`);
});
