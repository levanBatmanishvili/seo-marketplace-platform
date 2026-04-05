import Need from "../models/need.model.js";

export async function createNeed(req, res) {
  try {
    const { title, description, status } = req.body;

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