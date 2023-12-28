import * as z from "zod";

export const newsPostSchema = z.object({
  title: z.string().trim().min(1, "Title required!"),
  thumbnailImg: z
    .string()
    .trim()
    .min(1, "Thumbnail required!")
    .url("Invalid url"),
  description: z.string().trim().min(1, "Description required!"),
  tags: z.array(z.string()).optional(),
  newsBody: z.string().trim().min(1, "Content required!"),
});
