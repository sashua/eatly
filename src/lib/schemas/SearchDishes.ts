import { z } from 'zod';
import { config } from '../config';

export const SearchDishes = z.object({
  rest: z.string().cuid().optional(),
  search: z.string().trim().toLowerCase().optional(),
  sort: z.enum(['orders', 'price']).default('orders'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(config.dish.pageSize),
});
