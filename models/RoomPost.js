import db from "../database/connect.js";

class RoomPost {
  constructor(title, body, roomId, postedBy, type) {
    this.title = title;
    this.body = body;
    this.roomId = roomId;
    this.postedBy = postedBy;
    this.type = type;
  }

  createRoomPost = async () => {
    try {
      const sql = `INSERT INTO room_posts (title, body, roomId, postedBy, type)
                    VALUES(?, ?, ?, ?, ?);`;

      const roomPostValues = [
        this.title,
        this.body,
        this.roomId,
        this.postedBy,
        this.type,
      ];

      const [data, _] = await db.execute(sql, roomPostValues);

      return data;
    } catch (error) {
      console.log(error + `--- create room post ---`);
    }
  };

  static getRoomPost = async (roomPostId) => {
    try {
      const sql = `SELECT * FROM room_posts WHERE room_post_id = ?;`;

      const roomPostValues = [roomPostId];

      const [data, _] = await db.execute(sql, roomPostValues);

      return data;
    } catch (error) {
      console.log(error + `--- get room post ---`);
    }
  };

  static getAllRoomPosts = async (roomId) => {
    try {
      const sql = `SELECT * FROM rooms AS r
                    INNER JOIN room_posts AS rp
                    ON r.room_id = rp.room_id 
                    WHERE r.room_id = ? AND r.is_deleted = 0;`;

      const roomPostValues = [roomId];

      const [data, _] = await db.execute(sql, roomPostValues);

      return data;
    } catch (error) {
      console.log(error + `--- get all room posts ---`);
    }
  };

  static deleteRoomPost = async (roomPostId) => {
    try {
      const sql = `UPDATE room_posts SET is_deleted = 1 WHERE room_post_id = ?;`;

      const roomPostValues = [roomPostId];

      const [data, _] = await db.execute(sql, roomPostValues);

      return data;
    } catch (error) {
      console.log(error + `--- delete room post ---`);
    }
  };

  static updateRoomPostInfo = async (title, body, type, roomPostId) => {
    try {
      const sql = `UPDATE room_posts SET title = ?, body = ?, type = ? WHERE room_post_id = ?;`;

      const roomPostValues = [title, body, type, roomPostId];

      const [data, _] = await db.execute(sql, roomPostValues);

      return data;
    } catch (error) {
      console.log(error + `--- update room post info ---`);
    }
  };
}

export default RoomPost;
