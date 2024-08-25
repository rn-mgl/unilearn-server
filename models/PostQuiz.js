import db from "../database/connect.js";

class PostQuiz {
  constructor(
    question,
    answer,
    choice1,
    choice2,
    choice3,
    choice4,
    roomPostId
  ) {
    this.question = question;
    this.answer = answer;
    this.choice1 = choice1;
    this.choice2 = choice2;
    this.choice3 = choice3;
    this.choice4 = choice4;
    this.roomPostId = roomPostId;
  }

  createPostQuiz = async () => {
    try {
      const sql = `INSERT INTO post_quizzes (question, answer, choice_1, choice_2, choice_3, choice_4, room_post_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?);`;

      const postQuizValues = [
        this.question,
        this.answer,
        this.choice1,
        this.choice2,
        this.choice3,
        this.choice4,
        this.roomPostId,
      ];

      const [data, _] = await db.execute(sql, postQuizValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n--- create post quiz ---\n\n`);
    }
  };

  static getPostQuiz = async (postQuizId) => {
    try {
      const sql = `SELECT * FROM post_quizzes WHERE post_quiz_id = ?;`;

      const postQuizValues = [postQuizId];

      const [data, _] = await db.execute(sql, postQuizValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- get post quiz --- \n\n`);
    }
  };

  static getAllPostQuizzes = async (roomPostId) => {
    try {
      const sql = `SELECT * FROM post_quizzes WHERE room_post_id = ?;`;

      const postQuizValues = [roomPostId];

      const [data, _] = await db.execute(sql, postQuizValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- get all post quizzes \n\n`);
    }
  };

  static updatePostQuizInfo = async (
    question,
    answer,
    choice1,
    choice2,
    choice3,
    choice4,
    postQuizId
  ) => {
    try {
      const sql = `UPDATE post_quizzes SET question = ?, answer = ?, choice_1 = ?, choice_2 = ?, choice_3 = ?, choice_4 = ? WHERE post_quiz_id = ?;`;

      const postQuizValues = [
        question,
        answer,
        choice1,
        choice2,
        choice3,
        choice4,
        postQuizId,
      ];

      const [data, _] = await db.execute(sql, postQuizValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- update post quiz info --- \n\n`);
    }
  };

  static deletePostQuiz = async (postQuizId) => {
    try {
      const sql = `UPDATE post_quizzes SET is_deleted = 1 WHERE post_quiz_id = ?;`;

      const postQuizValues = [postQuizId];

      const [data, _] = await db.execute(sql, postQuizValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- delete post quiz --- \n\n`);
    }
  };
}
