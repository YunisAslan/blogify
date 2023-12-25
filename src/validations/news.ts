import * as z from "zod";

export const newsPostSchema = z.object({
  title: z.string().trim().min(1, "Title required!"),
  thumbnailImg: z.string().trim().min(1, "Thumbnail required!"),
  newsBody: z.string().trim().min(1, "Content required!"),
});
