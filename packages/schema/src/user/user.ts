import { z } from "zod";
import { ListResponse, Response } from "../shared/shared";

export const v_user = z.object({
 id: z.number(),
 password: z.string(),
 name: z.string(),
 email: z.string().optional(),
 mobile: z.string(),
 createdAt: z.string().optional(),
 otp: z.number().optional(),
 otpVerified: z.number().optional(),
 active: z.boolean(),
})

export type TUser = z.infer<typeof v_user>;
export type R_User = Response<TUser>;
export type R_Login = Response<{token: string, user: TUser}>;
export type R_Users = Response<TUser[]>;
export type ListUsers = ListResponse<TUser>;
export type PartialUser = Omit<TUser, 'id'|'active'>;