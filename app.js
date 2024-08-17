import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/", (req, res) => {
  console.log(req);
  res.json({ 123: "asd" });
});

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
