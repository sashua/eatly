import { formatStatistics } from '~/lib/utils';

interface StatisticsProps {
  restaurants: number;
  dishes: number;
  orders: number;
}

export function Statistics({ restaurants, dishes, orders }: StatisticsProps) {
  const statistics = [
    {
      text: 'Мережі ресторанів',
      value: formatStatistics(restaurants),
    },
    {
      text: 'Смачнючих страв',
      value: formatStatistics(dishes),
    },
    {
      text: 'Доставлених замовлень',
      value: formatStatistics(orders),
    },
  ];

  return (
    <section className="bg-brand bg-center py-8 [background-image:url(/foods.svg)] [background-size:250px] md:py-10 xl:py-12">
      <div className="container flex flex-col items-center justify-around gap-10 sm:flex-row sm:items-start">
        {statistics.map(({ text, value }, i) => (
          <p
            className="flex max-w-[240px] flex-col items-center gap-2 text-center"
            key={i}
          >
            <strong className="text-4xl font-medium text-white md:text-5xl">
              {value}
            </strong>
            <span className="text-sm font-light text-brand-200">{text}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
