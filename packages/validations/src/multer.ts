import { z } from "zod";

export const v_multer_file = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    destination: z.string(),
    filename: z.string(),
    path: z.string(),
    size: z.number()
});

export const v_multer_files = z.array(v_multer_file);

export type t_multer_file = z.infer<typeof v_multer_file>;
export type t_multer_files = z.infer<typeof v_multer_files>;
