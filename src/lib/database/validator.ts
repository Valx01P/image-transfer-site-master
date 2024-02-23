import * as z from "zod"

export const imageFormSchema = z.object({
  imageUrl: z.string()
})