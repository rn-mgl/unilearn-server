import db from "../database/connect.js";

class QuizTaker {
  constructor(answer, postQuizId, takerId) {
    this.answer = answer;
    this.postQuizId = postQuizId;
    this.takerId = takerId;
  }

  createQuizTaker = async () => {
    try {
      const sql = `INSERT INTO quiz_takers (answer, post_quiz_id, taker_id)
                        VALUES (?, ?, ?);`;

      const quizTakerValues = [this.answer, this.postQuizId, this.takerId];

      const [data, _] = await db.execute(sql, quizTakerValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- create quiz taker ---`);
    }
  };

  static getAllQuizTakers = async (postQuizId) => {
    try {
      const sql = `SELECT * FROM quiz_takers WHERE post_quiz_id = ?;`;

      const quizTakerValues = [postQuizId];

      const [data, _] = await db.execute(sql, quizTakerValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- get all quiz takers --- \n\n`);
    }
  };
}

export default QuizTaker;
