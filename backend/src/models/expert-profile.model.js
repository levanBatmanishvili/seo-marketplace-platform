import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./profile.model.js";

class ExpertProfile extends Model {}

ExpertProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    specialties: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    experienceLevel: {
      type: DataTypes.ENUM("junior", "mid", "senior"),
      allowNull: false,
      defaultValue: "junior",
    },

    portfolioUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "profiles",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ExpertProfile",
    tableName: "expert_profiles",
    timestamps: true,
  }
);

// Associations
Profile.hasOne(ExpertProfile, {
  foreignKey: "profileId",
  as: "expertProfile",
});

ExpertProfile.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

export default ExpertProfile;