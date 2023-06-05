import Image from 'next/image';
import { Button } from './Button';

interface SubscriptionProps {}

export function Subscription({}: SubscriptionProps) {
  return (
    <section className="py-28">
      <div className="container">
        <div className="flex justify-between gap-10 rounded-3xl bg-brand bg-center p-16 [background-image:url(/foods.svg)] [background-size:250px]">
          <form className="w-1/2">
            <p className="mb-4 text-6xl font-bold text-white">GET 20%</p>
            <label className="relative flex overflow-hidden rounded-2xl bg-white p-1 ring ring-transparent transition-colors focus-within:ring-brand-700">
              <input
                className="grow bg-transparent px-6 outline-none"
                type="email"
                placeholder="Enter Your Email Address"
              />
              <Button className="uppercase">Subscribe</Button>
            </label>
          </form>
          <div className="relative w-1/4">
            <div className="absolute inset-x-0 top-0 aspect-square">
              <Image src="/food-2.png" alt="Some food" fill />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
