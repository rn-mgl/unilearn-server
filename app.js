import "dotenv/config";
import "express-async-errors";
import express from "express";

import { notFoundMiddleware, errorMiddleware } from "./middlewares/index.js";
import connect from "./database/connect.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const start = () => {
  try {
    app.listen(port, async () => {
      console.log(`listening to port ${port}...`);
      connect();
    });
  } catch (error) {
    console.log(error);
  }
};

start();
