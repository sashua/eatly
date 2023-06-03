'use client';

import { Dish } from '@prisma/client';
import { useCallback, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { config } from '~/lib/config';
import { useFilterStore, usePreloadStore } from '~/lib/store';
import { fetcher, getApiUrl } from '~/lib/utils';
import { Button } from './Button';
import { DishCard } from './DishCard';

export function DishList() {
  const preloadedDishes = usePreloadStore(store => store.dishes);
  const [filter, updateFilter] = useFilterStore(store => [
    store.filter,
    store.update,
  ]);

  const getKey = useCallback(
    (page: number, prevData: Dish[] | null) => {
      if (prevData && prevData.length < config.dishesPageSize) return null;
      return getApiUrl('dishes', {
        ...filter,
        page: String(page + 1),
        limit: String(config.dishesPageSize),
      });
    },
    [filter]
  );

  const { data, isValidating, setSize } = useSWRInfinite<Dish[]>(
    getKey,
    fetcher,
    {
      fallbackData: [preloadedDishes],
      revalidateFirstPage: false,
    }
  );

  // reset pagination if filter values've been changed
  useEffect(() => {
    setSize(1);
  }, [filter, setSize]);

  const handleLoadMore = () => {
    setSize(size => size + 1);
  };

  const dishes = data?.flat();
  const hasNextPage = (data?.at(-1)?.length ?? 0) >= config.dishesPageSize;

  return (
    <div className="space-y-10">
      <ul className="grid grid-cols-4 gap-10">
        {dishes?.map(data => (
          <li key={data.id}>
            <DishCard data={data} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className="mx-auto block"
          variant="outline"
          disabled={isValidating}
          onClick={handleLoadMore}
        >
          {isValidating ? 'Зачекайте...' : 'Більше страв'}
        </Button>
      )}
    </div>
  );
}
