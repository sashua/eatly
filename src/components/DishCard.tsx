import { Dish } from '@prisma/client';
import clsx from 'clsx';
import { MdAdd, MdBlock, MdDone } from 'react-icons/md';
import { formatMoney } from '~/lib/utils';
import { IconButton, Image } from './common';

interface DishCardProps {
  data: Dish;
  isOrdered?: boolean;
  isDisabled?: boolean;
  onAdd: () => void;
}

export function DishCard({
  data,
  isOrdered,
  isDisabled,
  onAdd,
}: DishCardProps) {
  const { name, description, price, image } = data;

  return (
    <div
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-colors',
        isDisabled && 'opacity-50'
      )}
    >
      <Image
        className="aspect-[16/9]"
        src={`/images/${image}`}
        alt={name}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
      />
      <div className="flex grow flex-col justify-between gap-2 px-6 py-6 pt-4">
        <h3 className="text-lg font-semibold uppercase md:text-xl">{name}</h3>
        <p className="text-xs text-neutral-500">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold md:text-2xl">
            {formatMoney(price)}
          </p>
          <IconButton
            size="lg"
            icon={isDisabled ? MdBlock : isOrdered ? MdDone : MdAdd}
            disabled={isDisabled || isOrdered}
            onClick={onAdd}
          />
        </div>
      </div>
    </div>
  );
}
