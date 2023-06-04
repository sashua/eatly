import { Dish, Restaurant } from '@prisma/client';
import { DishList, Hero, PreloadStore, RestCard } from '~/components';

async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/restaurants');
  return res.json();
}

async function getDishes(): Promise<Dish[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/dishes');
  return res.json();
}

export default async function Home() {
  const restaurants = await getRestaurants();
  const dishes = await getDishes();

  return (
    <>
      <PreloadStore values={{ restaurants, dishes }} />
      <Hero />
      {/* <section className="border-b pb-20">
        <h2 className="mb-10 text-2xl font-semibold">
          Наші <span className="text-violet-700">Ресторани</span>
        </h2>
        <ul className="grid grid-cols-3 gap-10">
          {restaurants.map(data => (
            <li key={data.id}>
              <RestCard data={data} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b py-20">
        <h2 className="mb-10 text-2xl font-semibold">
          Наші <span className="text-violet-700">Страви</span>
        </h2>
        <DishList />
      </section> */}
    </>
  );
}
