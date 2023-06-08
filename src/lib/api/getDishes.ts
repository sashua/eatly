import { Dish } from '@prisma/client';
import { url } from 'inspector';
import { SearchDishes } from '../schemas';
import { getQueryString } from '../utils';

export const getDishes = async (
  searchParams?: SearchDishes
): Promise<Dish[]> => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + '/dishes' + getQueryString(searchParams);

  return (await fetch(url)).json();
};
