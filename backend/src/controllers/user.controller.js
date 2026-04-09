import { User, Profile, ExpertProfile } from "../models/index.js";

export async function getExperts(req, res) {
  try {
    const experts = await User.findAll({
      where: { role: "expert" },
      attributes: ["id", "email", "role"],
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: ["displayName", "bio", "avatarUrl"],
          include: [
            {
              model: ExpertProfile,
              as: "expertProfile",
              attributes: ["specialties", "experienceLevel", "portfolioUrl"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      experts,
    });
  } catch (error) {
    console.error("Get experts error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}