import { Dish } from '@prisma/client';
import { formatMoney } from '~/lib/utils';
import { OrderCard } from './OrderCard';

interface OrderListProps {}

export function OrderList({}: OrderListProps) {
  const dishes: Dish[] = [];
  const subtotal = 0;
  const delivery = 0;
  const total = 0;

  return (
    <>
      <ul className="space-y-4">
        {dishes.map(dish => (
          <li key={dish.id}>
            <OrderCard dish={dish} quantity={1} />
          </li>
        ))}
      </ul>
      <div className="divide-y-2 divide-dashed">
        <p className="text-gray-400 flex justify-between py-3 text-xl">
          <span>Підсумок</span>
          <span>{formatMoney(subtotal)}</span>
        </p>
        <p className="text-gray-400 flex justify-between py-3 text-xl">
          <span>Доставка</span>
          <span>{formatMoney(delivery)}</span>
        </p>
        <p className="flex justify-between py-3 text-2xl font-semibold">
          <span className="uppercase">Cума</span>
          <span>{formatMoney(total)}</span>
        </p>
      </div>
    </>
  );
}
