import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import { Server } from "socket.io";
import { createServer } from "http";

import { notFoundMiddleware, errorMiddleware } from "./middlewares/index.js";

import headRouter from "./routes/head/headRouter.js";
import headAuthRouter from "./routes/head/authRouter.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());

app.use("/head", headRouter);
app.use("/head_auth", headAuthRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

io.on("connection", (connection) => {
  console.log(connection);
});

const port = process.env.PORT || 9000;

const start = () => {
  try {
    httpServer.listen(port, () => {
      console.log(`listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
