import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getDishes } from '../api';
import { useOrderStore, useStore } from '../store';
import { mergeArrays } from '../utils';

export function useOrderDishesQuery () {
  const dishes = useStore(useOrderStore, s => s.dishes);
  const dishIds = dishes?.map(item => item.id);

  const { data } = useQuery({
    queryKey: ['dishes', 'list', { ids: dishIds }],
    queryFn: () => getDishes({ ids: dishIds }),
    keepPreviousData: true,
    enabled: Boolean(dishes?.length),
  });

  const orderDishes = useMemo(
    () => (dishes?.length && data ? mergeArrays(dishes, data, 'id') : dishes),
    [data, dishes]
  );

  return orderDishes;
};
