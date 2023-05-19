import  {z} from "zod";

export const v_menu = z.object({
    id: z.number(),
    name: z.string(),
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export type TMenu = z.infer<typeof v_menu>