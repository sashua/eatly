import { Restaurant } from '@prisma/client';

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/restaurants';
  return (await fetch(url)).json();
};
