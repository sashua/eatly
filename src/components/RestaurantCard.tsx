import { Restaurant } from '@prisma/client';
import Link from 'next/link';
import { Image } from './Image';

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
      <Image className="aspect-[2]" src={`/images/${image}`} alt={name} />
      <div className="px-8 pb-4 pt-6">
        <Image
          className="float-right aspect-[4/3] w-1/5"
          src={`/images/${logo}`}
          alt="Logo"
          fit="contain"
        />
        <div>
          <h3 className="mb-2 text-2xl font-semibold">{name}</h3>
          <p className="mb-4 text-sm text-neutral-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}
