import { z } from 'zod';

export const v_user_address = z
  .object({
    id: z.number(),
    userID: z.number(),
    title: z.string(),
    pinCode: z.coerce.number(),
    address: z.string(),
  })
  .required();

export type TUserAddress = z.infer<typeof v_user_address>;
