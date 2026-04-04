import Profile from "../models/profile.model.js";

export async function createProfile(req, res) {
  try {
    const { displayName, bio, avatarUrl } = req.validatedData;

    const existingProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (existingProfile) {
      return res.status(409).json({
        message: "Profile already exists for this user.",
      });
    }

    const profile = await Profile.create({
      displayName,
      bio,
      avatarUrl,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Profile created successfully.",
      profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function getMyProfile(req, res) {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}