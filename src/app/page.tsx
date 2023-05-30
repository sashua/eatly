import { Dish, Restaurant } from "@prisma/client";
import { DishList, RestCard } from "~/components";

async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/restaurants");
  return res.json();
}

async function getDishes(): Promise<Dish[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/dishes");
  return res.json();
}

interface HomeProps {
  searchParams: { rest?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const { rest } = searchParams;

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
        <DishList fallbackData={dishes} />
      </section>
    </>
  );
}
