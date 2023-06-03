import { OrderDish } from '~/lib/store';
import { formatMoney } from '~/lib/utils';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  dishes: OrderDish[];
  subtotal: number;
  delivery: number;
  total: number;
}

export function OrderList({
  dishes,
  subtotal,
  delivery,
  total,
}: OrderListProps) {
  return (
    <>
      <ul className="space-y-4">
        {dishes.map(dish => (
          <li key={dish.id}>
            <OrderCard data={dish} />
          </li>
        ))}
      </ul>
      <div className="divide-y-2 divide-dashed">
        <p className="flex justify-between py-3 text-xl text-gray-400">
          <span>Підсумок</span>
          <span>{formatMoney(subtotal)}</span>
        </p>
        <p className="flex justify-between py-3 text-xl text-gray-400">
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
