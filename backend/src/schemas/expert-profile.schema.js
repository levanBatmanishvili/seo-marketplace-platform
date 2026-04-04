import { z } from "zod";

export const createExpertProfileSchema = z.object({
  specialties: z
    .string()
    .min(3, "Specialties must be at least 3 characters long.")
    .max(500, "Specialties must be at most 500 characters long."),

  experienceLevel: z.enum(["junior", "mid", "senior"], {
    error: "Experience level must be junior, mid, or senior.",
  }),

  portfolioUrl: z
    .url("Portfolio URL must be a valid URL.")
    .optional()
    .or(z.literal("")),
});