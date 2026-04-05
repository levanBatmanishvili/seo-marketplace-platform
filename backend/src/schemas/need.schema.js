import { z } from "zod";

export const createNeedSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title must be at most 100 characters long."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(1000, "Description must be at most 1000 characters long."),

  status: z.enum(["open", "in_progress", "completed"], {
    error: "Status must be open, in_progress, or completed.",
  }),
});