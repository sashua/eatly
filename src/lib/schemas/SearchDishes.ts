import { z } from 'zod';

export const SearchDishesSchema = z.object({
  rest: z.string().cuid().optional(),
  ids: z
    .string()
    .optional()
    .transform(v => v?.split(','))
    .pipe(z.string().cuid().array().optional()),
  search: z.string().trim().toLowerCase().optional(),
  sort: z.enum(['name', 'price', 'popularity']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().optional(),
});

export type SearchDishes = z.infer<typeof SearchDishesSchema>;
