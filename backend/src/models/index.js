import sequelize from "../config/database.js";

import User from "./user.model.js";
import Profile from "./profile.model.js";
import ExpertProfile from "./expert-profile.model.js";
import Need from "./need.model.js";
import Relation from "./relation.model.js";

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

// User → Relations (as requester)
User.hasMany(Relation, {
    foreignKey: "requesterId",
    as: "sentRelations",
  });
  
  Relation.belongsTo(User, {
    foreignKey: "requesterId",
    as: "requester",
  });
  
  // User → Relations (as receiver)
  User.hasMany(Relation, {
    foreignKey: "receiverId",
    as: "receivedRelations",
  });
  
  Relation.belongsTo(User, {
    foreignKey: "receiverId",
    as: "receiver",
  });
  
  // Need → Relations
  Need.hasMany(Relation, {
    foreignKey: "needId",
    as: "relations",
  });
  
  Relation.belongsTo(Need, {
    foreignKey: "needId",
    as: "need",
  });

export { sequelize, User, Profile, ExpertProfile, Need, Relation };