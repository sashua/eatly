import { Dish } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDishes } from '../api';
import { config } from '../config';
import { SearchDishes } from '../schemas';

export const useDishesQuery = (
  initialData: Dish[],
  searchParams: SearchDishes
) => {
  return useInfiniteQuery({
    queryKey: ['dishes', 'list', searchParams],
    queryFn: ({ pageParam }) => getDishes({ ...searchParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < config.dishes.pageSize
        ? undefined
        : allPages.length + 1,
    initialData: { pages: [initialData], pageParams: [1] },
  });
};
