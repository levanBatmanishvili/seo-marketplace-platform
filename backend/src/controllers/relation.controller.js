import { Relation, Need } from "../models/index.js";

export async function createRelation(req, res) {
  try {
    const { receiverId, needId, message } = req.validatedData;

    const need = await Need.findByPk(needId);

    if (!need) {
      return res.status(404).json({
        message: "Need not found.",
      });
    }

    const existingRelation = await Relation.findOne({
      where: {
        requesterId: req.user.id,
        receiverId,
        needId,
      },
    });

    if (existingRelation) {
      return res.status(409).json({
        message: "Relation request already exists.",
      });
    }

    const relation = await Relation.create({
      requesterId: req.user.id,
      receiverId,
      needId,
      message,
      status: "pending",
    });

    return res.status(201).json({
      message: "Relation request created successfully.",
      relation,
    });
  } catch (error) {
    console.error("Create relation error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getMyRelations(req, res) {
  try {
    const relations = await Relation.findAll({
      where: {
        requesterId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      relations,
    });
  } catch (error) {
    console.error("Get relations error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}