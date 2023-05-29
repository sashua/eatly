import { DishCard, RestCard } from "~/components";
import { prisma } from "~/lib/prisma";

function getRestaurants() {
  return prisma.restaurant.findMany();
}

function getDishes() {
  return prisma.dish.findMany();
}

export default async function Home() {
  const restaurants = await getRestaurants();
  const dishes = await getDishes();

  return (
    <>
      <section className="pb-20 border-b">
        <h2 className="font-semibold text-2xl mb-10">
          Наші <span className="text-violet-700">Ресторани</span>
        </h2>
        <ul className="grid grid-cols-3 gap-10">
          {restaurants.map((data) => (
            <li key={data.id}>
              <RestCard data={data} />
            </li>
          ))}
        </ul>
      </section>

      <section className="py-20 border-b">
        <h2 className="font-semibold text-2xl mb-10">
          Наші <span className="text-violet-700">Страви</span>
        </h2>
        <ul className="grid grid-cols-4 gap-10">
          {dishes.map((data) => (
            <li key={data.id}>
              <DishCard data={data} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
