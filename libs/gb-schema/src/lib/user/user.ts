import { z } from 'zod';
import { ListResponse, Response } from '../shared/shared';
import { errorMessages } from '../messages';
import { TSubscriptionJourney } from '../subscription';

export const v_user = z.object({
  id: z.number(errorMessages),
  password: z.string(errorMessages).min(1, errorMessages.required_error),
  name: z.string(errorMessages).min(1, errorMessages.required_error),
  email: z.string().optional(),
  mobile: z.string(errorMessages).min(1, errorMessages.required_error),
  createdAt: z.string().optional(),
  otp: z.number().optional(),
  otpVerified: z.number().optional(),
  active: z.boolean(errorMessages),
  weight: z.number(errorMessages),
});

export type TUser = z.infer<typeof v_user>;
export type R_User = Response<TUser>;
export type R_Login = Response<{
  token: string;
  user: TUser;
  subscriptionJourney: TSubscriptionJourney;
}>;
export type R_Users = Response<TUser[]>;
export type ListUsers = ListResponse<TUser>;
export type PartialUser = Omit<TUser, 'id' | 'active'>;
