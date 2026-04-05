import { Message, Relation } from "../models/index.js";

export async function sendMessage(req, res) {
  try {
    const { relationId, content } = req.body;

    const relation = await Relation.findByPk(relationId);

    if (!relation) {
      return res.status(404).json({
        message: "Relation not found.",
      });
    }

    if (relation.status !== "accepted") {
      return res.status(403).json({
        message: "You can only send messages in accepted relations.",
      });
    }

    if (
      relation.requesterId !== req.user.id &&
      relation.receiverId !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not part of this relation.",
      });
    }

    const message = await Message.create({
      content,
      relationId,
      senderId: req.user.id,
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      messageData: message,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getMessages(req, res) {
  try {
    const { relationId } = req.params;

    const relation = await Relation.findByPk(relationId);

    if (!relation) {
      return res.status(404).json({
        message: "Relation not found.",
      });
    }

    if (
      relation.requesterId !== req.user.id &&
      relation.receiverId !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to view these messages.",
      });
    }

    const messages = await Message.findAll({
      where: { relationId },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}