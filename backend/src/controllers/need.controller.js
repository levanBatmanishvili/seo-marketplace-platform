import { Need, User } from "../models/index.js";

export async function createNeed(req, res) {
  try {
    const { title, description, status } = req.validatedData;

    const need = await Need.create({
      title,
      description,
      status,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Need created successfully.",
      need,
    });
  } catch (error) {
    console.error("Create need error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getMyNeeds(req, res) {
  try {
    const needs = await Need.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      needs,
    });
  } catch (error) {
    console.error("Get needs error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getOpenNeeds(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows: needs } = await Need.findAndCountAll({
      where: { status: "open" },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"],
        },
      ],
      limit,
      offset,
      distinct: true,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      needs,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Get open needs error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}