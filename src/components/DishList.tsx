'use client';

import { Dish } from '@prisma/client';
import { useState } from 'react';
import { MdArrowDownward } from 'react-icons/md';
import { Button, DishCard, SortBar } from '~/components';
import { useDishesQuery } from '~/lib/hooks';
import { SearchDishes } from '~/lib/schemas';
import { useOrderStore, useStore } from '~/lib/store';

interface DishListProps {
  initialSearchParams: SearchDishes;
  initialData: Dish[];
}

export function DishList({ initialData, initialSearchParams }: DishListProps) {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const { data, hasNextPage, fetchNextPage } = useDishesQuery(
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
        className="mb-10"
        initialSortParams={initialSearchParams}
        onChange={handleSortChange}
      />
      <ul className="grid grid-cols-4 gap-8">
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
