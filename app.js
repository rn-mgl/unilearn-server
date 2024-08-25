import "dotenv/config";
import "express-async-errors";
import express from "express";
import { notFoundMiddleware, errorMiddleware } from "./middlewares/index.js";
import headRouter from "./routes/head/headRouter.js";
import headAuthRouter from "./routes/head/authRouter.js";

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());

app.use("/head", headRouter);
app.use("/head_auth", headAuthRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
