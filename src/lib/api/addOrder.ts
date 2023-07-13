import { Order } from '@prisma/client';
import { CreateOrder } from '../schemas';

export const addOrder = async (order: CreateOrder): Promise<Order> => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/orders';
  console.log('🚧 order:', order);

  return (
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
  ).json();
};
