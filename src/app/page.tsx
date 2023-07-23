import { DishList, Hero, RestaurantCard, Statistics } from '~/components';
import { getDishes, getRestaurants, getStatistics } from '~/lib/api';

export default async function Home() {
  const [statistics, restaurants, dishes] = await Promise.all([
    getStatistics(),
    getRestaurants(),
    getDishes({ sort: 'popularity', order: 'desc' }),
  ]);

  return (
    <>
      <Hero />
      {statistics && <Statistics {...statistics} />}

      <section className="border-b py-20 md:py-24 xl:py-28">
        <div className="container">
          <h2 className="mb-14 text-center text-3xl font-semibold md:mb-16 md:text-4xl xl:mb-20 xl:text-5xl">
            Наші <span className="text-brand">Ресторани</span>
          </h2>
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map(data => (
              <li key={data.id}>
                <RestaurantCard data={data} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-24 xl:py-28">
        <div className="container">
          <h2 className="mb-14 text-center text-3xl font-semibold md:mb-16 md:text-4xl xl:mb-20 xl:text-5xl">
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

      {/* <Subscription /> */}
    </>
  );
}
