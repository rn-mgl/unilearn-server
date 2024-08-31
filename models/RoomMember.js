import db from "../database/connect.js";

class RoomMember {
  constructor(roomId, memberId, isModifier) {
    this.roomId = roomId;
    this.memberId = memberId;
    this.isModifier = isModifier;
  }

  createRoomMember = async () => {
    try {
      const sql = `INSERT INTO room_members (room_id, member_id, is_modifier)
                    VALUES (?, ?, ?);`;

      const roomMemberValues = [this.roomId, this.memberId, this.isModifier];

      const [data, _] = await db.execute(sql, roomMemberValues);

      return data;
    } catch (error) {
      console.log(error + `--- creat room member ---`);
    }
  };

  static getRoomMember = async (roomMemberId) => {
    try {
      const sql = `SELECT * FROM room_members WHERE room_member_id = ?;`;

      const roomMemberValues = [roomMemberId];

      const [data, _] = await db.execute(sql, roomMemberValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- get room member --- \n\n`);
    }
  };

  static deleteRoomMember = async (roomMemberId) => {
    try {
      const sql = `DELETE FROM room_members WHERE room_member_id = ?;`;

      const roomMemberValues = [roomMemberId];

      const [data, _] = await db.execute(sql, roomMemberValues);

      return data;
    } catch (error) {
      console.log(error + `--- delete room member ---`);
    }
  };

  static getAllRoomMembers = async (roomId) => {
    try {
      const sql = `SELECT * FROM room_members WHERE room_id = ?;`;

      const roomMemberValues = [roomId];

      const [data, _] = await db.execute(sql, roomMemberValues);

      return data;
    } catch (error) {
      console.log(error + `\n\n --- get all room members --- \n\n`);
    }
  };
}

export default RoomMember;
