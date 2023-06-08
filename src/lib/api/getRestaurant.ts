import { Restaurant } from '@prisma/client';

export const getRestaurant = async (
  id: Restaurant['id']
): Promise<Restaurant> => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/restaurants/' + id;
  return (await fetch(url)).json();
};
