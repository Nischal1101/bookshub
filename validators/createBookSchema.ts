import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2, "Title is required"),
  caption: z.string().min(5, "Caption is required"),
  rating: z.number().min(1, "Rating is required"),
  image: z.string().min(1, "Image is required"),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
