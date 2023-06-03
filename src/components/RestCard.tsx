'use client';

import { Restaurant } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useFilterStore, useOrderStore } from '~/lib/store';

interface RestCardProps {
  data: Restaurant;
}

export function RestCard({ data }: RestCardProps) {
  const { id, name, logo } = data;

  const [isSelected, updateFilter] = useFilterStore(store => [
    store.filter.rest === id,
    store.update,
  ]);
  const [isDisabled, setOrderRestaurant] = useOrderStore(store => [
    (store.restaurantId ?? id) !== id,
    store.setRestaurant,
  ]);

  const handleClick = () => {
    updateFilter({ rest: isSelected ? '' : id });
  };

  return (
    <button
      className={clsx(
        'group block w-full rounded-2xl bg-white p-6 shadow-xl transition-colors hover:bg-violet-100 disabled:bg-white disabled:opacity-50',
        isSelected && 'outline outline-2 outline-violet-500/50'
      )}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <div className="relative aspect-[3] group-disabled:opacity-50 group-disabled:grayscale">
        <Image
          className="object-contain"
          src={`/images/${logo}`}
          alt={name}
          fill
        />
      </div>
    </button>
  );
}
