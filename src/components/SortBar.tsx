'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MdSort } from 'react-icons/md';
import { tv } from 'tailwind-variants';
import { SearchDishes } from '~/lib/schemas';
import { Button } from './common';

type Sort = Required<SearchDishes>['sort'];
type Order = Required<SearchDishes>['order'];

const buttons: { label: string; sort: Sort }[] = [
  { label: 'Популярність', sort: 'popularity' },
  { label: 'Назва', sort: 'name' },
  { label: 'Ціна', sort: 'price' },
];

const bar = tv({
  slots: {
    base: 'flex w-full justify-end text-neutral-300 transition-colors',
    icon: 'h-5 w-5 transition',
  },
});

interface SortBarProps {
  className?: string;
  initialSortParams?: Pick<SearchDishes, 'sort' | 'order'>;
  onChange: (sortParams: { sort: Sort; order: Order }) => void;
}

export function SortBar({
  className,
  initialSortParams = { sort: 'popularity', order: 'desc' },
  onChange,
}: SortBarProps) {
  const [activeButton, setActiveButton] = useState<Sort>(
    initialSortParams.sort ?? 'popularity'
  );
  const [buttonsState, setButtonsState] = useState<Record<Sort, Order>>(() =>
    buttons.reduce(
      (acc, { sort }) => ({
        ...acc,
        [sort]:
          initialSortParams.sort === sort ? initialSortParams.order : 'asc',
      }),
      {} as Record<Sort, Order>
    )
  );

  const handleClick = (sort: Sort) => {
    let order = buttonsState[sort];
    if (sort === activeButton) {
      order = order === 'asc' ? 'desc' : 'asc';
      setButtonsState({
        ...buttonsState,
        [sort]: order,
      });
    } else {
      setActiveButton(sort);
    }
    onChange({ sort, order });
  };

  const classes = bar();
  return (
    <div className={classes.base({ className })}>
      {buttons.map(({ label, sort }) => (
        <Button
          className={clsx(sort !== activeButton && 'text-neutral-300')}
          key={sort}
          variant="flat"
          onClick={() => handleClick(sort)}
        >
          {label}
          <MdSort
            className={classes.icon({
              className: clsx(
                buttonsState[sort] === 'asc' && '-scale-y-100',
                sort !== activeButton && 'opacity-0'
              ),
            })}
          />
        </Button>
      ))}
    </div>
  );
}
