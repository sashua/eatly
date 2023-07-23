import { Button, Image } from './common';

export function Hero() {
  return (
    <section className="py-16 md:py-24 xl:py-28">
      <div className="container flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-2 xl:gap-10">
        <div className="mx-auto w-5/6 text-center sm:text-left md:w-auto md:basis-1/2">
          <h1 className="mb-4 text-5xl font-semibold tracking-tight md:mb-6 md:text-6xl xl:mb-8 xl:text-7xl">
            Смакуй на повну з <span className="text-brand">Їжмо!</span>
          </h1>
          <p className="text-sm text-neutral-500 md:text-base xl:text-lg">
            Замовляй улюблені страви де б ти не був, за дві хвилини озирнися -
            ми вже тут! З нами швидко та смачно!
          </p>
        </div>
        <div className="sm:basis-1/2 sm:bg-right-top sm:bg-no-repeat sm:px-4 sm:[background-image:url(/arrow-1.svg)] sm:[background-size:25%] md:px-10 lg:px-20">
          <div className="mx-auto w-3/5 overflow-hidden rounded-full bg-brand sm:w-auto">
            <Image
              className="aspect-square"
              src="/food-1.png"
              alt="Some food"
              sizes="(max-width: 639px) 60vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
