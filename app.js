import "dotenv/config";
import "express-async-errors";

// deps
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import { Server } from "socket.io";
import { createServer } from "http";

// middleware
import {
  notFoundMiddleware,
  errorMiddleware,
  authMiddleware,
} from "./middlewares/index.js";

// router
import headRouter from "./routes/head/headRouter.js";
import headAuthRouter from "./routes/head/authRouter.js";

import adminRouter from "./routes/admin/adminRouter.js";
import adminAuthRouter from "./routes/admin/authRouter.js";

import learnerRouter from "./routes/learner/learnerRouter.js";
import learnerAuthRouter from "./routes/learner/authRouter.js";

import roomRouter from "./routes/room/roomRouter.js";
import roomPostRouter from "./routes/room/roomPostRouter.js";
import roomMemberRouter from "./routes/room/roomMemberRouter.js";

import postFileRouter from "./routes/post/postFileRouter.js";
import postQuizRouter from "./routes/post/postQuizRouter.js";

import quizTakerRouter from "./routes/quiztaker/quizTakerRouter.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());

// head
app.use("/head", authMiddleware, headRouter);
app.use("/head_auth", headAuthRouter);

// admin
app.use("/admin", authMiddleware, adminRouter);
app.use("/admin_auth", adminAuthRouter);

// learner
app.use("/learner", authMiddleware, learnerRouter);
app.use("/learner_auth", learnerAuthRouter);

// room
app.use("/room", authMiddleware, roomRouter);
app.use("/room_post", authMiddleware, roomPostRouter);
app.use("/room_member", authMiddleware, roomMemberRouter);

// post
app.use("/post_file", authMiddleware, postFileRouter);
app.use("/post_quiz", authMiddleware, postQuizRouter);

// quiz taker
app.use("/quiz_taker", authMiddleware, quizTakerRouter);

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
