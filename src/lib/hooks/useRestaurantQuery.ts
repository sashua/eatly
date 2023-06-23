import { Restaurant } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getRestaurant } from '../api';

export function useRestaurantQuery(id?: Restaurant['id']) {
  return useQuery({
    queryKey: ['restaurants', 'detail', id],
    queryFn: () => getRestaurant(id!),
    enabled: Boolean(id),
  });
}
