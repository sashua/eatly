'use client';

import { Dish } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { MdArrowDownward } from 'react-icons/md';
import { DishCard, SortBar } from '~/components';
import { useDishesQuery } from '~/lib/hooks';
import { SearchDishes } from '~/lib/schemas';
import { useOrderStore, useStore } from '~/lib/store';
import { Button } from './common';

interface DishListProps {
  initialSearchParams: SearchDishes;
  initialData: Dish[];
}

export function DishList({ initialData, initialSearchParams }: DishListProps) {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const { data, isLoading, hasNextPage, fetchNextPage } = useDishesQuery(
    initialData,
    searchParams
  );

  const orderedDishes = useStore(useOrderStore, s => s.dishes);
  const addOneDish = useOrderStore(s => s.addOneDish);

  const handleSortChange = (
    sortParams: Pick<SearchDishes, 'sort' | 'order'>
  ) => {
    setSearchParams(prev => ({ ...prev, ...sortParams }));
  };

  const orderRestaurantId = orderedDishes?.[0]?.restaurantId;
  const orderedDishIds = orderedDishes?.map(item => item.id);
  return (
    <div className="">
      <SortBar
        className="mb-6 md:mb-10"
        initialSortParams={initialSearchParams}
        onChange={handleSortChange}
      />
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.pages.flat().map(item => (
          <li key={item.id}>
            <DishCard
              data={item}
              isOrdered={orderedDishIds?.includes(item.id)}
              isDisabled={
                Boolean(orderRestaurantId) &&
                orderRestaurantId !== item.restaurantId
              }
              onAdd={() => addOneDish?.(item)}
            />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className="ml-auto mt-6 md:mt-10"
          variant="flat"
          disabled={isLoading}
          onClick={() => fetchNextPage()}
        >
          <span>Більше страв</span>
          <MdArrowDownward
            className={clsx('h-5 w-5', isLoading && 'animate-bounce')}
          />
        </Button>
      )}
    </div>
  );
}
