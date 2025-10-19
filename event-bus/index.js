import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  }); // posts service
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  }); // comments service
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  }); // query service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  }); // moderation service

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log(`event-bus service is running on 4005`);
});
