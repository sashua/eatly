import { Restaurant } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="relative aspect-[2] overflow-hidden">
        <Image
          className="translate-y-[5%] scale-110 object-cover transition-transform duration-500 group-hover:translate-y-0"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="px-8 pb-4 pt-6">
        <div className="relative float-right aspect-[4/3] w-1/5">
          <Image
            className="object-contain"
            src={`/images/${logo}`}
            alt="Logo"
            fill
          />
        </div>
        <div>
          <h3 className="mb-2 text-2xl font-semibold">{name}</h3>
          <p className="mb-4 text-sm text-neutral-500">{description}</p>
        </div>
      </div>
    </Link>
  );
}
