import sequelize from "../config/database.js";

import User from "./user.model.js";
import Profile from "./profile.model.js";
import ExpertProfile from "./expert-profile.model.js";
import Need from "./need.model.js";

// =========================
// RELATIONS
// =========================

// User → Profile
User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

// Profile → ExpertProfile
Profile.hasOne(ExpertProfile, { foreignKey: "profileId", as: "expertProfile" });
ExpertProfile.belongsTo(Profile, { foreignKey: "profileId", as: "profile" });

// User → Needs
User.hasMany(Need, { foreignKey: "userId", as: "needs" });
Need.belongsTo(User, { foreignKey: "userId", as: "user" });

export { sequelize, User, Profile, ExpertProfile, Need };