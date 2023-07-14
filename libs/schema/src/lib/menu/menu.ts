import  {z} from "zod";

export const v_menu = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});

export type TMenu = z.infer<typeof v_menu>