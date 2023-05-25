import { z } from "zod";

export const v_ingredients = z.object({
  id: z.number(),
  name: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TIngredients = z.infer<typeof v_ingredients>;