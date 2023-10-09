import { z } from 'zod';

export const v_user_weight = z.object({
  id: z.number(),
  weight: z.number(),
  userID: z.number(),
  createdAt: z.string().optional(),
});

export type TUserWeight = z.infer<typeof v_user_weight>;
