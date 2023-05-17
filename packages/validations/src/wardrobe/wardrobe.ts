import { z } from "zod";

export const v_wardrobe = z.object({title: z.string().transform(v => v.toLowerCase())});

export const v_item_to_wardrobe = z.object({ items: z.array(z.number()).nonempty()});

export type t_wardrobe = z.infer<typeof v_wardrobe>;


