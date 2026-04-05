import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    relationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "relations",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: true,
  }
);

export default Message;