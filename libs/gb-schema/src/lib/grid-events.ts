import { z } from 'zod';

export interface FilterData {
  type: 'text' | 'number' | 'select' | 'date';
  value: number | string;
  field: string;
  condition:
    | 'equals'
    | 'greater than'
    | 'less than'
    | 'between'
    | 'contains'
    | 'not equal';
}

export const v_grid_events = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  sort: z
    .string()
    .transform((str, ctx): Partial<{ Asc: string; Desc: string }> => {
      try {
        return JSON.parse(str);
      } catch (e) {
        ctx.addIssue({ code: 'custom', message: 'Invalid sort options' });
        return z.NEVER;
      }
    }),
  filters: z.string().transform((str, ctx): FilterData[] => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: 'custom', message: 'Invalid filters' });
      return z.NEVER;
    }
  }),
});

export type GridEvents = z.infer<typeof v_grid_events>;
