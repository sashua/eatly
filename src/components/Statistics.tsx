const statistics = [
  { text: 'Satisfied Costumers All Great Over The World', value: '10K+' },
  { text: 'Healthy Dishes Sold Including Milk Shakes Smooth', value: '4M' },
  {
    text: 'Reliable Customer Support We Provide Great Experiences',
    value: '99.99%',
  },
];

interface StatisticsProps {}

export function Statistics({}: StatisticsProps) {
  return (
    <section className="bg-brand bg-center py-12 [background-image:url(/foods.svg)] [background-size:250px]">
      <div className="container flex justify-around gap-10">
        {statistics.map(({ text, value }, i) => (
          <p
            className="flex max-w-[240px] flex-col items-center gap-2 text-center"
            key={i}
          >
            <strong className="text-5xl font-medium text-white">{value}</strong>
            <span className="text-sm font-light text-brand-200">{text}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
