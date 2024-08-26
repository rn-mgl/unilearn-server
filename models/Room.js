import db from "../database/connect.js";

class Room {
  constructor(name, description, createdBy, isPublic) {
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.isPublic = isPublic;
  }

  createRoom = async () => {
    try {
      const sql = `INSERT INTO rooms (name, description, created_by, is_public) 
                    VALUES (?, ?, ?, ?);`;

      const roomValues = [
        this.name,
        this.description,
        this.createdBy,
        this.isPublic,
      ];

      const [data, _] = await db.execute(sql, roomValues);

      return data;
    } catch (error) {
      console.log(error + `--- create room ---`);
    }
  };

  static getRoom = async (roomId) => {
    try {
      const sql = `SELECT * FROM rooms WHERE room_id = ? AND is_deleted = 0;`;

      const roomValues = [roomId];

      const [data, _] = await db.execute(sql, roomValues);

      return data;
    } catch (error) {
      console.log(error + `--- get room ---`);
    }
  };

  static getAllPublicRooms = async () => {
    try {
      const sql = `SELECT * FROM rooms WHERE is_public = 1;`;

      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error + `--- get all public rooms ---`);
    }
  };

  static getAllPrivateRooms = async () => {
    try {
      const sql = `SELECT * FROM rooms WHERE is_public = 0;`;

      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- get all private rooms --- \n\n`);
    }
  };

  static deleteRoom = async (roomId) => {
    try {
      const sql = `UPDATE room SET is_deleted = 1 WHERE room_id = ?;`;

      const roomValues = [roomId];

      const [data, _] = await db.execute(sql, roomValues);

      return data;
    } catch (error) {
      console.log(error + `--- delete room ---`);
    }
  };

  static updateRoomInfo = async (
    name,
    description,
    profileImage,
    bannerImage,
    isPublic,
    roomId
  ) => {
    try {
      const sql = `UPDATE rooms SET name = ?, description = ?, profileImage = ?, bannerImage = ?, is_public = ? WHERE room_id = ?;`;

      const roomValues = [
        name,
        description,
        profileImage,
        bannerImage,
        isPublic,
        roomId,
      ];

      const [data, _] = await db.execute(sql, roomValues);

      return data;
    } catch (error) {
      console.log(error + `--- update room info ---`);
    }
  };
}

export default Room;
