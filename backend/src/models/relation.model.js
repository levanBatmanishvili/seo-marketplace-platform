import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Relation extends Model {}

Relation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    needId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "needs",
        key: "id",
      },
    },

    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Relation",
    tableName: "relations",
    timestamps: true,
  }
);

export default Relation;