import db from "../database/connect.js";

class Learner {
  constructor(name, surname, username, email, password) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  createLearner = async () => {
    try {
      const sql = `INSERT INTO learners (name, surname, username, email, password)
                    VALUES (?, ?, ?, ?, ?);`;

      const learnerValues = [
        this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
      ];

      const [data, _] = await db.execute(sql, learnerValues);

      return data;
    } catch (error) {
      console.log(error + `--- create learner ---`);
    }
  };

  static getLearner = async (learner_id) => {
    try {
      const sql = `SELECT * FROM learners WHERE learner_id = ?`;

      const learnerValues = [learner_id];

      const [data, _] = await db.execute(sql, learnerValues);

      return data;
    } catch (error) {
      console.log(error + `--- get learner ---`);
    }
  };

  static verifyLearner = async (learner_id) => {
    try {
      const sql = `UPDATE learners SET is_verified WHERE learner_id = ?;`;

      const learnerValues = [learner_id];

      const [data, _] = await db.execute(sql, learnerValues);

      return data;
    } catch (error) {
      console.log(error + `--- verify learner ---`);
    }
  };

  static updateLearnerInfo = async (
    name,
    surname,
    username,
    image,
    learner_id
  ) => {
    try {
      const sql = `UPDATE learners SET name = ?, surname = ?, username = ?, image = ? WHERE learnerd_id = ?;`;

      const learnerValues = [name, surname, username, image, learner_id];

      const [data, _] = await db.execute(sql, learnerValues);

      return data;
    } catch (error) {
      console.log(error + `--- update learner info ---`);
    }
  };

  static changePassword = async (password, learner_id) => {
    try {
      const sql = `UPDATE learners SET password = ? WHERE learner_id = ?;`;

      const learnerValues = [password, learner_id];

      const [data, _] = await db.execute(sql, learnerValues);

      return data;
    } catch (error) {
      console.log(error + `--- change password ---`);
    }
  };
}
