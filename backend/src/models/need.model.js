import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

class Need extends Model {}

Need.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("open", "in_progress", "completed"),
      allowNull: false,
      defaultValue: "open",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Need",
    tableName: "needs",
    timestamps: true,
  }
);


export default Need;