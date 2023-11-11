import { z } from "zod";

export const v_grid_events = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number()
});

export type GridEvents = z.infer<typeof v_grid_events>;
