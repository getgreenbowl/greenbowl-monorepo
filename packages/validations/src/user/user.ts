import { z } from "zod";
import { messages } from "../messages";

export const v_register = z
  .object({
    userName: z
      .string({
        required_error: messages.required,
        invalid_type_error: messages.type,
      })
      .transform((val) => val.trim()),
    name: z.string({ invalid_type_error: messages.type }).optional(),
    email: z
      .string({
        required_error: messages.required,
        invalid_type_error: messages.type,
      }).email("This is not a valid email.")
      .transform((val) => val.trim()),
    mobile: z
      .string({
        required_error: messages.required,
        invalid_type_error: messages.type,
      })
      .min(10, { message: "Must be a valid mobile number" })
      .max(10, { message: "Must be a valid mobile number" }),
    password: z.string({
      required_error: messages.required,
      invalid_type_error: messages.type,
    }).transform(val => val.trim()),
    countryID: z.number({
      required_error: messages.required,
      invalid_type_error: messages.type,
    })
  })
  .strict();

export const v_update_info = z.object({
  userName: z.optional(
    z
      .string({
        invalid_type_error: messages.type,
      })
      .transform((val) => val.trim())
  ),
  name: z.optional(z.string({ invalid_type_error: messages.type })),
  email: z.optional(
    z
      .string({ invalid_type_error: messages.type }).email("This is not a valid email.")
      .transform((val) => val.trim())
  ),
  mobile: z.optional(
    z
      .string({ invalid_type_error: messages.type })
      .min(10, { message: "Must be a valid mobile number" })
      .max(10, { message: "Must be a valid mobile number" })
  ),
  gender: z.optional(z.string({ invalid_type_error: messages.type })),
  dob: z.optional(z.string({ invalid_type_error: messages.type })),
  countryID: z.optional(z.number({ invalid_type_error: messages.type, })),
  cityID: z.optional(z.number({ invalid_type_error: messages.type, })),
  stateID: z.optional(z.number({ invalid_type_error: messages.type, })),
  zipcode: z.optional(z.number({ invalid_type_error: messages.type, })),
  address: z.optional(z.string({ invalid_type_error: messages.type, }))
});

export const v_otp = z
  .object({
    otp: z.number({
      required_error: messages.required,
    }),
    mobile: z.string({
      required_error: messages.required,
    }),
    os: z.enum(['android', 'ios']),

    fcmToken: z.string()
  })
  .strict();

export const v_change_password = z
  .object({
    oldPassword: z.string({
      required_error: messages.required,
    }),
    newPassword: z.string({
      required_error: messages.required,
    }),
  })
  .required()
  .strict();

export const v_user_query = z.object({
  year: z.string().optional(),
  month: z.string().optional()
})

export const v_user_params = z.object({
  datatype: z.enum(['weekly', 'yearly', "monthly"]),
})

export const v_params_check_username = z
  .object({
    userName: z
      .string({
        required_error: messages.required,
        invalid_type_error: messages.type,
      })
      .transform((val) => val.trim()),
  })

export const v_params_check_mobile = z
  .object({
    mobile: z
      .string({
        required_error: messages.required,
        invalid_type_error: messages.type,
      })
      .min(10, { message: "Must be a valid mobile number" })
      .max(10, { message: "Must be a valid mobile number" }),
  })

export const v_params_check_email = z
  .object({
    email: z
      .string({
        required_error: messages.required,
        invalid_type_error: messages.type,
      }).email("This is not a valid email.")
      .transform((val) => val.trim()),
  })

export type t_user_query = z.infer<typeof v_user_query>
export type t_user_params = z.infer<typeof v_user_params>


export type t_otp = z.infer<typeof v_otp>;
export type t_register = z.infer<typeof v_register>;
export type t_change_password = z.infer<typeof v_change_password>;
export type t_update_info = z.infer<typeof v_update_info>;

export type res_register = {
  data: { user: t_register; otp: number };
  msg: string;
};
export type res_verify_otp = {
  data: { user: t_register; token: string };
  msg: string;
};

export type t_params_check_username = z.infer<typeof v_params_check_username>
export type t_params_check_mobile = z.infer<typeof v_params_check_mobile>
export type t_params_check_email = z.infer<typeof v_params_check_email>


export const v_profile_photo = z.object({ filename: z.string() });

export const v_login_picked = v_register.pick({ mobile: true, password: true });

export const v_login = v_login_picked.extend({
  os: z.enum(['android', 'ios']), fcmToken: z.optional(z.string())
});

export const v_mobile_picked = v_register.pick({ mobile: true });

export const v_forgot_password = z.object({
  email: z.optional(
    z
      .string({ invalid_type_error: messages.type }).email("This is not a valid email.")
      .transform((val) => val.trim())
  ),
  mobile: z.optional(
    z
      .string({ invalid_type_error: messages.type })
      .min(10, { message: "Must be a valid mobile number" })
      .max(10, { message: "Must be a valid mobile number" })
  )
})


export const v_username = v_register.pick({ userName: true });

export const v_userInfo = z.object({
  gender: z.enum(["Male", "Female", "Don't want to disclose"]),
  dob: z.string({
    required_error: messages.required,
    invalid_type_error: messages.type,
  })
});


export type t_login = z.infer<typeof v_login>;
export type res_login = {
  data: { user: t_register; token: string };
  msg: string;
};
