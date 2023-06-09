import { Dish } from '@prisma/client';
import {
  DishList,
  Hero,
  RestaurantCard,
  Statistics,
  Subscription,
} from '~/components';
import { getDishes, getRestaurants } from '~/lib/api';

export default async function Home() {
  const [restaurants, dishes] = await Promise.all([
    getRestaurants(),
    getDishes({ sort: 'popularity', order: 'desc' }),
  ]);

  return (
    <>
      <Hero />
      <Statistics />

      <section className="border-b py-28">
        <div className="container">
          <h2 className="mb-20 text-center text-5xl font-semibold">
            Наші <span className="text-brand">Ресторани</span>
          </h2>
          <ul className="grid grid-cols-3 gap-8">
            {restaurants.map(data => (
              <li key={data.id}>
                <RestaurantCard data={data} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b py-28">
        <div className="container">
          <h2 className="mb-10 text-center text-5xl font-semibold">
            Наші <span className="text-brand">Страви</span>
          </h2>
          <DishList
            initialData={dishes}
            initialSearchParams={{
              sort: 'popularity',
              order: 'desc',
            }}
          />
        </div>
      </section>

      <Subscription />
    </>
  );
}
