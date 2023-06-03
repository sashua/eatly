import { Dish } from '@prisma/client';
import Image from 'next/image';
import { MdAdd, MdDeleteForever, MdRemove } from 'react-icons/md';
import { config } from '~/lib/config';
import { OrderDish, useOrderStore } from '~/lib/store';
import { formatMoney } from '~/lib/utils';
import { IconButton } from './IconButton';

interface OrderCardProps {
  data: OrderDish;
}

export function OrderCard({ data }: OrderCardProps) {
  const [setQty, deleteDish] = useOrderStore(store => [
    store.setDishQty,
    store.deleteDish,
  ]);
  const { id, name, price, qty, image } = data;
  const sum = price * qty;

  return (
    <div className="flex w-full items-center overflow-hidden rounded-xl bg-white shadow-md">
      <div className="relative aspect-[3/2] shrink-0 basis-40">
        <Image
          className="object-cover"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="flex grow items-center justify-between gap-4 px-4 py-2">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-xl font-semibold uppercase">
            {name}
          </h3>
          <p className="text-lg font-semibold">{formatMoney(price)}</p>
        </div>
        <div className="space-y-2">
          <div className="relative ml-auto flex w-28 items-center justify-between">
            <IconButton
              variant="outline"
              icon={qty <= 1 ? MdDeleteForever : MdRemove}
              onClick={() => (qty <= 1 ? deleteDish(id) : setQty(id, qty - 1))}
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center text-xl">
              {String(qty).padStart(2, '0')}
            </span>
            <IconButton
              icon={MdAdd}
              disabled={qty >= config.dishMaxQty}
              onClick={() => setQty(id, qty + 1)}
            />
          </div>
          <p className="text-center text-gray-600">{formatMoney(sum)}</p>
        </div>
      </div>
    </div>
  );
}
