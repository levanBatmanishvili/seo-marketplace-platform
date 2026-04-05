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

export async function acceptRelation(req, res) {
  try {
    const { id } = req.params;

    const relation = await Relation.findByPk(id);

    if (!relation) {
      return res.status(404).json({
        message: "Relation not found.",
      });
    }

    if (relation.receiverId !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to accept this relation.",
      });
    }

    relation.status = "accepted";
    await relation.save();

    return res.status(200).json({
      message: "Relation accepted successfully.",
      relation,
    });
  } catch (error) {
    console.error("Accept relation error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function rejectRelation(req, res) {
  try {
    const { id } = req.params;

    const relation = await Relation.findByPk(id);

    if (!relation) {
      return res.status(404).json({
        message: "Relation not found.",
      });
    }

    if (relation.receiverId !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to reject this relation.",
      });
    }

    relation.status = "rejected";
    await relation.save();

    return res.status(200).json({
      message: "Relation rejected successfully.",
      relation,
    });
  } catch (error) {
    console.error("Reject relation error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}