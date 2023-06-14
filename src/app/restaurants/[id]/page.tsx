import { DishList } from '~/components';
import { Image } from '~/components/common';
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
      <div className="mb-20 overflow-hidden rounded-3xl shadow-2xl">
        <Image
          className="aspect-[4]"
          src={`/images/${restaurant.image}`}
          alt={restaurant.name}
        />
        <div className="flex items-center justify-between gap-10 p-10">
          <div className="flex basis-1/2 items-center gap-10">
            <Image
              className="aspect-[4/3] w-1/5"
              src={`/images/${restaurant.logo}`}
              alt="Logo"
              fit="contain"
            />
            <h3 className="mb-2 text-5xl font-semibold">{restaurant.name}</h3>
          </div>
          <p className="mb-4 basis-1/3 text-neutral-500">
            {restaurant.description}
          </p>
        </div>
      </div>

      <DishList
        initialData={dishes}
        initialSearchParams={{
          rest: params.id,
          sort: 'popularity',
          order: 'desc',
        }}
      />
    </div>
  );
}
