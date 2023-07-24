'use client';

import { useMemo } from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { useOrderDishesQuery } from '~/lib/hooks';
import { useOrderStore } from '~/lib/store';
import { formatMoney } from '~/lib/utils';
import { OrderCard } from './OrderCard';

const orderList = tv({
  slots: {
    list: '',
    total: 'flex justify-between border-b border-dashed font-semibold',
  },
  variants: {
    size: {
      sm: {
        list: 'mb-6 space-y-4 sm:mb-10',
        total: 'pb-2 text-lg sm:text-xl',
      },
      md: {
        list: 'mb-8 space-y-6 sm:mb-12',
        total: 'pb-3 text-xl sm:text-2xl',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type OrderListVariants = VariantProps<typeof orderList>;

interface OrderListProps extends OrderListVariants {
  className?: string;
  disabled?: boolean;
}

export function OrderList({ className, size, disabled }: OrderListProps) {
  const dishes = useOrderDishesQuery();
  const addOneDish = useOrderStore(s => s.addOneDish);
  const delOneDish = useOrderStore(s => s.delOneDish);

  const total = useMemo(
    () =>
      formatMoney(
        dishes?.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0
        ) ?? 0
      ),
    [dishes]
  );

  const classes = orderList({ size });
  return (
    <div className={className}>
      <ul className={classes.list()}>
        {dishes?.map(data => (
          <li key={data.id}>
            <OrderCard
              data={data}
              size={size}
              disabled={disabled}
              onAdd={() => addOneDish(data)}
              onDel={() => delOneDish(data)}
            />
          </li>
        ))}
      </ul>
      <p className={classes.total()}>
        <span>Сума</span>
        <span>{total}</span>
      </p>
    </div>
  );
}
