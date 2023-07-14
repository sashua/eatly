import { Dish } from '@prisma/client';
import error from 'next/error';
import { SearchDishes } from '../schemas';
import { getQueryString } from '../utils';

export const getDishes = async (
  searchParams?: SearchDishes
): Promise<Dish[]> => {
  try {
    const url =
      process.env.NEXT_PUBLIC_API_URL +
      '/dishes' +
      getQueryString(searchParams);
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('🚧', error);
    return [];
  }
};
