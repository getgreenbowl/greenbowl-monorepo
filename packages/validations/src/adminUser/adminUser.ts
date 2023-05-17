import { z } from "zod";
import { messages } from "../messages";

export const v_user = z
    .object({
        email: z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }).transform(val => val.trim()),

        password: z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }).transform(val => val.trim()),
        passwordChangedOn: z.optional(z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        })),
        roleId: z.number({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }),
        active: z.boolean({
            required_error: messages.required,
            invalid_type_error: messages.type,
        })
    });


export const v_update_user = z
    .object({
        email: z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }).transform(val => val.trim()),

        password: z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }).transform(val => val.trim()).nullish(),
        roleId: z.number({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }),
        active: z.boolean({
            required_error: messages.required,
            invalid_type_error: messages.type,
        })
    });

export const v_adminlogin = z
    .object({
        email: z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }).email().transform(val => val.trim()),

        password: z.string({
            required_error: messages.required,
            invalid_type_error: messages.type,
        }).transform(val => val.trim())
    })
    .strict()
    .required();


export const v_admin_change_password = z
    .object({
        oldPassword: z.string({
            required_error: messages.required,
        }),
        newPassword: z.string({
            required_error: messages.required,
        }),
        confirmPassword: z.string({
            required_error: messages.required,
        })
    })
    .required()
    .strict();

export const v_email_picked = v_user.pick({ email: true });

export type t_user = z.infer<typeof v_user>;
export type t_update_user = z.infer<typeof v_update_user>;
export type t_adminlogin = z.infer<typeof v_adminlogin>;
export type v_admin_change_password = z.infer<typeof v_admin_change_password>;
