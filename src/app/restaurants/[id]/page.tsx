import Image from 'next/image';
import { DishList } from '~/components';
import { getDishes, getRestaurant } from '~/lib/api';

interface RestaurantProps {
  params: { id: string };
}

export default async function Restaurant({ params }: RestaurantProps) {
  const [restaurant, dishes] = await Promise.all([
    getRestaurant(params.id),
    getDishes({ rest: params.id, sort: 'popularity', order: 'desc' }),
  ]);
  return (
    <div className="container py-28">
      <div className="mb-28 overflow-hidden rounded-3xl shadow-2xl">
        <div className="relative aspect-[4]">
          <Image
            className="object-cover"
            src={`/images/${restaurant.image}`}
            alt={restaurant.name}
            fill
          />
        </div>
        <div className="flex items-center justify-between gap-10 p-10">
          <div className="flex basis-1/2 items-center gap-10">
            <div className="relative aspect-[4/3] w-1/5">
              <Image
                className="object-contain"
                src={`/images/${restaurant.logo}`}
                alt="Logo"
                fill
              />
            </div>
            <h3 className="mb-2 text-5xl font-semibold">{restaurant.name}</h3>
          </div>
          <p className="mb-4 basis-1/3 text-xl text-neutral-500">
            {restaurant.description}
          </p>
        </div>
      </div>

      <DishList
        initialData={dishes}
        searchParams={{ rest: params.id, sort: 'popularity', order: 'desc' }}
      />
    </div>
  );
}
