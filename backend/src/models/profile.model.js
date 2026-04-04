import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profiles",
    timestamps: true,
  }
);

// Associations
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Profile;