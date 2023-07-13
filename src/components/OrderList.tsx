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
        list: 'mb-10 space-y-4',
        total: 'pb-2 text-xl',
      },
      md: {
        list: 'mb-12 space-y-6',
        total: 'pb-3 text-2xl',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type OrderListVariants = VariantProps<typeof orderList>;

interface OrderListProps extends OrderListVariants {
  className?: string;
}

export function OrderList({ className, size }: OrderListProps) {
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
