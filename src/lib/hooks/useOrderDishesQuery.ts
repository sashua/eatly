import { useQuery } from '@tanstack/react-query';
import { getDishes } from '../api';
import { useOrderStore, useStore } from '../store';
import { mergeArrays } from '../utils';

export const useOrderDishesQuery = () => {
  const orderDishes = useStore(useOrderStore, s => s.dishes);
  const dishIds = orderDishes?.map(item => item.id);

  const { data = [] } = useQuery({
    queryKey: ['dishes', 'list', { ids: dishIds }],
    queryFn: () => getDishes({ ids: dishIds }),
    select: data =>
      orderDishes && data ? mergeArrays(orderDishes, data, 'id') : orderDishes,
    keepPreviousData: true,
    enabled: Boolean(orderDishes?.length),
  });

  const mergedData = orderDishes?.length
    ? mergeArrays(orderDishes, data, 'id')
    : [];

  return { data: mergedData };
};
