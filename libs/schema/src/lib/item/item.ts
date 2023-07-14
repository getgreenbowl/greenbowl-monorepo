import { z } from "zod";

export const v_item = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  menuID: z.number(),
  protien: z.number(),
  fat: z.number(),
  energy: z.number(),
  carbs: z.number(),
  calories: z.number(),
  isActive: z.boolean(),
});
  
export const v_item_ingredients = z.object({
    id: z.number(),
    itemID: z.number(),
    ingredientID: z.number(),
})

export const v_item_images = z.object({
    id: z.number(),
    img: z.string(),
    main: z.boolean(),
    itemID: z.number(),
})

export type TItem = z.infer<typeof v_item>;
export type TItemIngredients = z.infer<typeof v_item_ingredients>;
export type TItemImages = z.infer<typeof v_item_images>;