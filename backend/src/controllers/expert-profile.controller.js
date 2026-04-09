import { ExpertProfile, Profile } from "../models/index.js";


export async function createExpertProfile(req, res) {
  try {
    if (req.user.role !== "expert") {
      return res.status(403).json({
        message: "Only expert users can create an expert profile.",
      });
    }

    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    const existingExpertProfile = await ExpertProfile.findOne({
      where: { profileId: profile.id },
    });

    if (existingExpertProfile) {
      return res.status(409).json({
        message: "Expert profile already exists for this user.",
      });
    }

    const { specialties, experienceLevel, portfolioUrl } = req.validatedData;

    const expertProfile = await ExpertProfile.create({
      specialties,
      experienceLevel,
      portfolioUrl,
      profileId: profile.id,
    });

    return res.status(201).json({
      message: "Expert profile created successfully.",
      expertProfile,
    });
  } catch (error) {
    console.error("Create expert profile error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getMyExpertProfile(req, res) {
  try {
    if (req.user.role !== "expert") {
      return res.status(403).json({
        message: "Only expert users can access an expert profile.",
      });
    }

    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    const expertProfile = await ExpertProfile.findOne({
      where: { profileId: profile.id },
    });

    if (!expertProfile) {
      return res.status(404).json({
        message: "Expert profile not found.",
      });
    }

    return res.status(200).json({
      expertProfile,
    });
  } catch (error) {
    console.error("Get expert profile error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getExpertProfileByUserId(req, res) {
  try {
    const { id } = req.params;

    const profile = await Profile.findOne({
      where: { userId: id },
      include: [
        {
          model: ExpertProfile,
          as: "expertProfile",
        },
      ],
    });

    if (!profile || !profile.expertProfile) {
      return res.status(404).json({
        message: "Expert profile not found.",
      });
    }

    return res.status(200).json({
      profile,
      expertProfile: profile.expertProfile,
    });
  } catch (error) {
    console.error("Get expert profile by user id error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}