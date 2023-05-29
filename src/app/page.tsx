import { RestCard } from "~/components";
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
        <ul className="flex gap-6">
          {restaurants.map((data) => (
            <li className="basis-1/3" key={data.id}>
              <RestCard data={data} />
            </li>
          ))}
        </ul>
      </section>

      <section className="py-20 border-b">
        <h2 className="font-semibold text-2xl mb-10">
          Наші <span className="text-violet-700">Страви</span>
        </h2>
        <ul className="flex gap-6">
          {restaurants.map((data) => (
            <li className="basis-1/3" key={data.id}>
              <RestCard data={data} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
