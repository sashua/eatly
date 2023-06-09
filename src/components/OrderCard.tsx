import { Dish } from '@prisma/client';
import Image from 'next/image';
import { MdAdd, MdDeleteForever, MdRemove } from 'react-icons/md';
import { formatMoney } from '~/lib/utils';
import { IconButton } from './IconButton';

interface OrderCardProps {
  dish: Dish;
  quantity: number;
}

export function OrderCard({ dish, quantity }: OrderCardProps) {
  const { id, name, price, image } = dish;
  const sum = price * quantity;

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
              icon={quantity <= 1 ? MdDeleteForever : MdRemove}
              onClick={() => {}}
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center text-xl">
              {quantity}
            </span>
            <IconButton
              icon={MdAdd}
              disabled={quantity >= 9}
              onClick={() => {}}
            />
          </div>
          <p className="text-gray-600 text-center">{formatMoney(sum)}</p>
        </div>
      </div>
    </div>
  );
}
