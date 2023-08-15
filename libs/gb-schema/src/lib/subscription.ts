import { z } from 'zod';

export const DAYS = ['7', '30', '60'] as const;

export const v_subscription = z.object({
  id: z.number(),
  userID: z.number(),
  days: z.enum(DAYS),
  breakfast: z.boolean(),
  addressID: z.number(),
  lunch: z.boolean(),
  lunchAddressID: z.number().optional(),
  dinner: z.boolean(),
  dinnerAddressID: z.number().optional(),
  paymentID: z.number(),
  active: z.boolean(),
});

export const v_subscription_journey = v_subscription.optional();

export type TSubscription = z.infer<typeof v_subscription>;
export type TSubscriptionJourney = z.infer<typeof v_subscription_journey>;
