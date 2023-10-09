import { z } from 'zod';
import { v_item } from '../item/item';

export const v_user_item = z.object({
  id: z.number(),
  userID: z.number(),
  itemID: z.number(),
  serveDate: z.date(),
  skip: z.boolean(),
  mealType: z.string(),
  delivered: z.boolean(),
  Items: z.array(v_item),
});

export type TUserItem = z.infer<typeof v_user_item>;
