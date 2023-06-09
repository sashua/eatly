'use client';

import { Dish } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MdArrowDownward, MdPersonAddDisabled } from 'react-icons/md';
import { Button, DishCard, SortBar } from '~/components';
import { getDishes } from '~/lib/api';
import { config } from '~/lib/config';
import { SearchDishes } from '~/lib/schemas';
import { useOrderStore, useStore } from '~/lib/store';

interface DishListProps {
  initialSearchParams?: SearchDishes;
  initialData: Dish[];
}

export function DishList({
  initialData,
  initialSearchParams = {},
}: DishListProps) {
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['dishes', searchParams],
    queryFn: ({ pageParam }) => getDishes({ ...searchParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < config.dish.pageSize ? undefined : allPages.length + 1,
    initialData: { pages: [initialData], pageParams: [1] },
  });

  const orderRestaurant = useStore(useOrderStore, s => s.restaurantId);
  const orderDishes = useStore(useOrderStore, s => s.dishes);
  const ordered = orderDishes?.map(item => item.id);
  const addDish = useOrderStore(s => s.addDish);

  const handleSortChange = (
    sortParams: Pick<SearchDishes, 'sort' | 'order'>
  ) => {
    setSearchParams(prev => ({ ...prev, ...sortParams }));
  };

  return (
    <div className="">
      <SortBar
        className="mb-10"
        initialSortParams={initialSearchParams}
        onChange={handleSortChange}
      />
      <ul className="grid grid-cols-4 gap-8">
        {data?.pages.flat().map(item => (
          <li key={item.id}>
            <DishCard
              data={item}
              isOrdered={ordered?.includes(item.id)}
              isDisabled={
                Boolean(orderRestaurant) &&
                orderRestaurant !== item.restaurantId
              }
              onAdd={() => addDish?.(item)}
            />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className="ml-auto mt-10"
          variant="flat"
          onClick={() => fetchNextPage()}
        >
          More Dishes <MdArrowDownward className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
