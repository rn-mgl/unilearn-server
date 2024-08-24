import db from "../database/connect.js";

class Head {
  constructor(name, surname, username, email, password) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  createHead = async () => {
    try {
      const sql = ` INSERT INTO heads (name, surname, username, email, password)
                        VALUES (?, ?, ?, ?, ?);
        `;

      const headValues = [
        this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
      ];

      const [data, _] = await db.execute(sql, headValues);

      return data;
    } catch (error) {
      console.log(error + `--- create head ---`);
    }
  };

  static getHead = async (head_id) => {
    try {
      const sql = `SELECT * FROM heads where head_id = ?;`;

      const headValues = [head_id];

      const [data, _] = await db.execute(sql, headValues);

      return data;
    } catch (error) {
      console.log(error + `--- get head ---`);
    }
  };

  static verifyHead = async (head_id) => {
    try {
      const sql = `UPDATE heads SET is_verified = ? WHERE head_id = ?;`;

      const headValues = [true, head_id];

      const [data, _] = await db.execute(sql, headValues);

      return data;
    } catch (error) {
      console.log(error + `--- verify head ---`);
    }
  };

  static updateHeadInfo = async (name, surname, username, image, head_id) => {
    try {
      const sql = `UPDATE heads SET name = ?, surname = ?, username = ?, image = ? WHERE head_id = ?;`;

      const headValues = [name, surname, username, image, head_id];

      const [data, _] = await db.execute(sql, headValues);

      return data;
    } catch (error) {
      console.log(error + `--- update head info ---`);
    }
  };

  static changePassword = async (password, head_id) => {
    try {
      const sql = `UPDATE heads SET password = ? WHERE head_id = ?;`;

      const headValues = [password, head_id];

      const [data, _] = await db.execute(sql, headValues);

      return data;
    } catch (error) {
      console.log(error + `--- change password ---`);
    }
  };
}

export default Head;
