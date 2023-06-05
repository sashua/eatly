import Image from 'next/image';
import { Button } from './Button';

export function Hero() {
  return (
    <section className="py-28">
      <div className="container flex items-center gap-10">
        <div className="basis-1/2">
          <h1 className="mb-4 text-7xl font-semibold tracking-tight">
            Enjoy Foods All Over The <span className="text-brand">World</span>
          </h1>
          <p className="mb-12 text-lg text-neutral-500">
            Eatly help you set saving goals, earn cash back offers. Go to
            disclaimer for more details and get paychecks up to two days early.
          </p>
          <div className="flex gap-5">
            <Button>Get Started</Button>
            <Button variant="outline">Go Pro</Button>
          </div>
        </div>
        <div className="basis-1/2 bg-right-top bg-no-repeat px-20 [background-image:url(/arrow-1.svg)] [background-size:25%]">
          <div className="overflow-hidden rounded-full bg-brand">
            <div className="relative aspect-square">
              <Image src="/food-1.png" alt="Some food" fill />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
