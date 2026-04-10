import { Relation, Need, User } from "../models/index.js";

/**
 * CREATE RELATION (bidirectional)
 */
export async function createRelation(req, res) {
  try {
    const { receiverId, needId, message } = req.validatedData;

    const requesterId = req.user.id;

    // ❌ Same user
    if (requesterId === receiverId) {
      return res.status(400).json({
        message: "Requester and receiver cannot be the same user.",
      });
    }

    // 🔍 Find need
    const need = await Need.findByPk(needId);
    if (!need) {
      return res.status(404).json({
        message: "Need not found.",
      });
    }

    // 🔍 Find receiver
    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found.",
      });
    }

    const needOwnerId = need.userId;

    const requesterIsNeedOwner = requesterId === needOwnerId;
    const receiverIsNeedOwner = receiverId === needOwnerId;

    /**
     * 🔐 VALIDATION RULES
     */

    // RULE 1: One must be need owner
    if (!requesterIsNeedOwner && !receiverIsNeedOwner) {
      return res.status(400).json({
        message: "One participant must be the owner of the selected need.",
      });
    }

    // RULE 2: Cannot both be owner
    if (requesterIsNeedOwner && receiverIsNeedOwner) {
      return res.status(400).json({
        message: "Need owner cannot create a relation with themselves.",
      });
    }

    // RULE 3: Client → Expert
    if (requesterIsNeedOwner) {
      if (receiver.role !== "expert") {
        return res.status(400).json({
          message: "Clients can only send requests to experts.",
        });
      }
    }

    // RULE 4: Expert → Client
    if (!requesterIsNeedOwner) {
      if (req.user.role !== "expert") {
        return res.status(400).json({
          message: "Only experts can send requests for needs they do not own.",
        });
      }

      if (!receiverIsNeedOwner) {
        return res.status(400).json({
          message: "Experts must send requests to the owner of the need.",
        });
      }
    }

    /**
     * 🔁 DUPLICATE CHECK (bidirectional)
     */
    const existingRelations = await Relation.findAll({
      where: { needId },
    });

    const duplicateRelation = existingRelations.find(
      (relation) =>
        (relation.requesterId === requesterId &&
          relation.receiverId === receiverId) ||
        (relation.requesterId === receiverId &&
          relation.receiverId === requesterId)
    );

    if (duplicateRelation) {
      return res.status(409).json({
        message:
          "Relation request already exists for this need and participants.",
      });
    }

    /**
     * ✅ CREATE RELATION
     */
    const relation = await Relation.create({
      requesterId,
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

/**
 * GET MY RELATIONS
 */
export async function getMyRelations(req, res) {
  try {
    const sentRelations = await Relation.findAll({
      where: { requesterId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    const receivedRelations = await Relation.findAll({
      where: { receiverId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      sentRelations,
      receivedRelations,
    });
  } catch (error) {
    console.error("Get relations error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

/**
 * ACCEPT RELATION
 */
export async function acceptRelation(req, res) {
  try {
    const { id } = req.params;

    const relation = await Relation.findByPk(id);

    if (!relation) {
      return res.status(404).json({
        message: "Relation not found.",
      });
    }

    if (relation.status !== "pending") {
      return res.status(400).json({
        message: "This relation has already been finalized.",
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

/**
 * REJECT RELATION
 */
export async function rejectRelation(req, res) {
  try {
    const { id } = req.params;

    const relation = await Relation.findByPk(id);

    if (!relation) {
      return res.status(404).json({
        message: "Relation not found.",
      });
    }

    if (relation.status !== "pending") {
      return res.status(400).json({
        message: "This relation has already been finalized.",
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