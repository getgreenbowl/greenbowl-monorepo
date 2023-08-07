import { z } from 'zod';

export const v_item = z.object({
  id: z.number(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  menuID: z.coerce.number(),
  protien: z.coerce.number(),
  fat: z.coerce.number(),
  energy: z.coerce.number(),
  carbs: z.coerce.number(),
  calories: z.coerce.number(),
  isActive: z.boolean(),
});

export const v_item_with_ingredients = v_item.extend({
  ingredients: z
    .array(
      z.object({
        id: z.number(),
        itemID: z.number(),
        ingredientID: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
      })
    )
    .optional(),
});

export const v_item_ingredients = z.object({
  id: z.number(),
  itemID: z.number(),
  ingredientID: z.number(),
});

export const v_item_images = z.object({
  id: z.number(),
  img: z.string(),
  main: z.boolean(),
  itemID: z.number(),
});

export type TItem = z.infer<typeof v_item>;
export type TItemIngredients = z.infer<typeof v_item_ingredients>;
export type TItemImages = z.infer<typeof v_item_images>;
export type TItemWithIngredients = z.infer<typeof v_item_with_ingredients>;
