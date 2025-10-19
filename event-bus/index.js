import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event); // posts service
  axios.post("http://localhost:4001/events", event); // comments service
  axios.post("http://localhost:4002/events", event); // query service
  res.send({ status: "ok" });
});

app.listen(4005, () => {
  console.log(`event-bus service is running on 4005`);
});
