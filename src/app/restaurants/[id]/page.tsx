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

  if (!restaurant) {
    return null;
  }

  return (
    <div className="container py-20 md:py-24 xl:py-28">
      <div className="mb-20 overflow-hidden rounded-3xl shadow-2xl">
        <Image
          className="aspect-[4]"
          src={`/images/${restaurant.image}`}
          alt={restaurant.name}
          sizes="100vw"
          priority
        />
        <div className="flex flex-col gap-2 p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-10">
          <div className="flex items-center justify-between gap-10 sm:flex-row-reverse lg:basis-1/2 lg:flex-row lg:justify-start">
            <Image
              className="hidden aspect-[4/3] sm:block sm:w-1/6 lg:w-1/5"
              src={`/images/${restaurant.logo}`}
              alt="Logo"
              fit="contain"
              sizes="15vw"
            />
            <h3 className="text-3xl font-semibold md:text-4xl xl:text-5xl">
              {restaurant.name}
            </h3>
          </div>
          <p className="text-neutral-500 sm:w-5/6 lg:w-auto lg:basis-2/5 xl:basis-1/3">
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
