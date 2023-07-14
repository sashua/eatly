import { Order } from '@prisma/client';
import { CreateOrder } from '../schemas';

export const addOrder = async (order: CreateOrder): Promise<Order | null> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/orders';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    return await response.json();
  } catch (error) {
    console.log('🚧', error);
    return null;
  }
};
