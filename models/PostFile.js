import db from "../database/connect.js";

class PostFile {
  constructor(name, fileType, file, roomPostId) {
    this.name = name;
    this.fileType = fileType;
    this.file = file;
    this.roomPostId = roomPostId;
  }

  createPostFile = async () => {
    try {
      const sql = `INSERT INTO post_files (name, file_type, file, room_post_id)
                    VALUES (?, ?, ?, ?);`;

      const postFileValues = [
        this.name,
        this.fileType,
        this.file,
        this.roomPostId,
      ];

      const [data, _] = await db.execute(sql, postFileValues);

      return data;
    } catch (error) {
      console.log(error + `--- create post file ---`);
    }
  };

  static getPostFile = async (postFileId) => {
    try {
      const sql = `SELECT * FROM post_files WHERE post_file_id = ?;`;

      const postFileValues = [postFileId];

      const [data, _] = await db.execute(sql, postFileValues);

      return data;
    } catch (error) {
      console.log(error + `--- get post file ---`);
    }
  };

  static getAllPostFiles = async (roomPostId) => {
    try {
      const sql = `SELECT * FROM post_files WHERE room_post_id = ?;`;

      const postFileValues = [roomPostId];

      const [data, _] = await db.execute(sql, postFileValues);

      return data;
    } catch (error) {
      console.log(error + `--- get all post files ---`);
    }
  };

  static deletePostFile = async (postFileId) => {
    try {
      const sql = `DELETE FROM post_files WHERE post_file_id = ?;`;

      const postFileValues = [postFileId];

      const [data, _] = await db.execute(sql, postFileValues);

      return data;
    } catch (error) {
      console.log(error + `--- `);
    }
  };

  static deletePostFiles = async (roomPostId) => {
    try {
      const sql = `DELETE FROM post_files WHERE room_post_id = ?;`;

      const postFileValues = [roomPostId];

      const [data, _] = await db.execute(sql, postFileValues);

      return data;
    } catch (error) {
      console.log(error + `--- delete post files ---`);
    }
  };

  static updatePostFile = async (name, fileType, file, postFileId) => {
    try {
      const sql = `UPDATE post_files SET name = ?, file_type = ?, file = ? WHERE post_file_id = ?;`;

      const postFileValues = [name, fileType, file, postFileId];

      const [data, _] = await db.execute(sql, postFileValues);

      return data;
    } catch (error) {
      console.log(error + `--- update post file ---`);
    }
  };
}
