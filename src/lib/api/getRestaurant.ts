import { Restaurant } from '@prisma/client';

export const getRestaurant = async (
  id: Restaurant['id']
): Promise<Restaurant | null> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/restaurants/' + id;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('🚧', error);
    return null;
  }
};
