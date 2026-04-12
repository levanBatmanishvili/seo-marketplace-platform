import { User, Profile, ExpertProfile } from "../models/index.js";

export async function getExperts(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows: experts } = await User.findAndCountAll({
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
      limit,
      offset,
      distinct: true,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      experts,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Get experts error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}