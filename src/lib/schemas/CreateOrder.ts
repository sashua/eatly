import { z } from 'zod';

export const CreateOrderSchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  restaurantId: z.string().cuid(),
  restaurantAddress: z.string(),
  dishes: z.array(
    z.object({
      id: z.string().cuid(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;
