import { Restaurant } from '@prisma/client';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + '/restaurants';
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('🚧', error);
    return [];
  }
};
