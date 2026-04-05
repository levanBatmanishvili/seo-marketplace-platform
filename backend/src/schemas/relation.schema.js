import { z } from "zod";

export const createRelationSchema = z.object({
  receiverId: z
    .number("Receiver ID must be a number.")
    .int("Receiver ID must be an integer.")
    .positive("Receiver ID must be positive."),

  needId: z
    .number("Need ID must be a number.")
    .int("Need ID must be an integer.")
    .positive("Need ID must be positive."),

  message: z
    .string()
    .min(5, "Message must be at least 5 characters long.")
    .max(1000, "Message must be at most 1000 characters long."),
});