import { z } from "zod";

export const createProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters long.")
    .max(50, "Display name must be at most 50 characters long."),

  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters long.")
    .optional()
    .or(z.literal("")),

  avatarUrl: z
    .url("Avatar URL must be a valid URL.")
    .optional()
    .or(z.literal("")),
});

export const updateProfileSchema = z.object({
    displayName: z
      .string()
      .min(2, "Display name must be at least 2 characters long.")
      .max(50, "Display name must be at most 50 characters long.")
      .optional(),
  
    bio: z
      .string()
      .max(500, "Bio must be at most 500 characters long.")
      .optional()
      .or(z.literal("")),
  
    avatarUrl: z
      .url("Avatar URL must be a valid URL.")
      .optional()
      .or(z.literal("")),
  });