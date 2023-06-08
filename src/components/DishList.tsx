'use client';

import { Dish } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MdArrowDownward } from 'react-icons/md';
import { Button, DishCard } from '~/components';
import { getDishes } from '~/lib/api';
import { config } from '~/lib/config';
import { SearchDishes } from '~/lib/schemas';

interface DishListProps {
  searchParams?: SearchDishes;
  initialData: Dish[];
}

export function DishList({ initialData, searchParams }: DishListProps) {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['dishes', searchParams],
    queryFn: ({ pageParam }) => getDishes({ ...searchParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < config.dish.pageSize ? undefined : allPages.length + 1,
    initialData: { pages: [initialData], pageParams: [1] },
  });

  return (
    <div className="">
      <ul className="grid grid-cols-4 gap-8">
        {data?.pages.flat().map(item => (
          <li key={item.id}>
            <DishCard data={item} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className="ml-auto mt-10"
          variant="flat"
          icon={MdArrowDownward}
          onClick={() => fetchNextPage()}
        >
          More Dishes
        </Button>
      )}
    </div>
  );
}
