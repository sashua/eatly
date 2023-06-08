import { Dish } from '@prisma/client';
import Image from 'next/image';
import { MdAdd, MdBlock, MdDone } from 'react-icons/md';
import { formatMoney } from '~/lib/utils';
import { IconButton } from './IconButton';

interface DishCardProps {
  data: Dish;
}

export function DishCard({ data }: DishCardProps) {
  const { name, description, price, image } = data;

  const isDisabled = false;
  const isOrdered = false;
  return (
    <div
      className={
        'group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-colors'
      }
    >
      <div className="relative aspect-[3/2]">
        <Image
          className="object-cover"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="flex grow flex-col justify-between gap-2 px-6 py-6 pt-4">
        <h3 className="text-xl font-semibold uppercase">{name}</h3>
        <p className="text-xs text-neutral-500">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{formatMoney(price)}</p>
          <IconButton
            size="lg"
            icon={isDisabled ? MdBlock : isOrdered ? MdDone : MdAdd}
            disabled={isDisabled || isOrdered}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
