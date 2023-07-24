import { Restaurant } from '@prisma/client';
import Link from 'next/link';
import { Image } from './common';

interface RestaurantCardProps {
  data: Restaurant;
}

export function RestaurantCard({ data }: RestaurantCardProps) {
  const { id, name, description, logo, image } = data;

  return (
    <Link
      className="group block h-full overflow-hidden rounded-3xl bg-white shadow-xl transition-colors hover:bg-brand-100"
      href={`/restaurants/${id}`}
    >
      <Image
        className="aspect-[2]"
        src={`/images/${image}`}
        alt={name}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw"
      />
      <div className="px-6 pb-4 pt-6 md:px-8">
        <Image
          className="float-right aspect-[4/3] w-1/5 sm:hidden md:block"
          src={`/images/${logo}`}
          alt={`Логотип ${name}`}
          fit="contain"
          sizes="15vw"
        />
        <div>
          <h3 className="mb-2 text-xl font-semibold md:text-2xl">{name}</h3>
          <p className="mb-4 text-sm text-neutral-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}
