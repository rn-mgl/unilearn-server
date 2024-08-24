import db from "../database/connect.js";

class Admin {
  constructor(name, surname, username, email, password) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  createAdmin = async () => {
    try {
      const sql = `INSERT INTO admins (name, surname, username, email, password)
                    VALUES (?, ?, ?, ?, ?);`;

      const adminValues = [
        this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
      ];

      const [data, _] = await db.execute(sql, adminValues);

      return data;
    } catch (error) {
      console.log(error + `--- create admin ---`);
    }
  };

  static getAdmin = async (adminId) => {
    try {
      const sql = `SELECT * FROM admins WHERE admin_id = ?;`;

      const adminValues = [adminId];

      const [data, _] = await db.execute(sql, adminValues);

      return data;
    } catch (error) {
      console.log(error + `--- get admin ---`);
    }
  };

  static verifyAdmin = async (adminId) => {
    try {
      const sql = `UPDATE admins SET is_verified = ? WHERE admin_id = ?;`;

      const adminValues = [adminId];

      const [data, _] = await db.execute(sql, adminValues);

      return data;
    } catch (error) {
      console.log(error + `--- verify admin ---`);
    }
  };

  static updateAdminInfo = async (name, surname, username, image, adminId) => {
    try {
      const sql = `UPDATE admins SET name = ?, surname = ?, username = ?, image = ? WHERE admin_id = ?;`;

      const adminValues = [name, surname, username, image, adminId];

      const [data, _] = await db.execute(sql, adminValues);

      return data;
    } catch (error) {
      console.log(error + `--- update admin info ---`);
    }
  };

  static changePassword = async (password, adminId) => {
    try {
      const sql = `UPDATE admins SET password = ? WHERE admin_id = ?;`;

      const adminValues = [password, adminId];

      const [data, _] = await db.execute(sql, adminValues);

      return data;
    } catch (error) {
      console.log(error + `--- change password ---`);
    }
  };
}

export default Admin;
