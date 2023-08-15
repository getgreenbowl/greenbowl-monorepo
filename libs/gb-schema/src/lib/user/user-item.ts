import { z } from 'zod';

export const v_user_item = z.object({
  id: z.number(),
  userID: z.number(),
  itemID: z.number(),
  serveDate: z.date(),
  skip: z.boolean(),
});

export type TUserItem = z.infer<typeof v_user_item>;
