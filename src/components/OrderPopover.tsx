'use client';

import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useRestaurantQuery } from '~/lib/hooks';
import { useOrderStore, useStore } from '~/lib/store';
import { OrderList } from './OrderList';
import { Image } from './common';

export function OrderPopover() {
  const dishes = useStore(useOrderStore, s => s.dishes);
  const { data: restaurant } = useRestaurantQuery(dishes?.[0]?.restaurantId);

  const isOrderEmpty = (dishes?.length ?? 0) === 0;

  return (
    <Popover className="relative z-30">
      {({ open, close }) => (
        <>
          <Popover.Button
            className="rounded-lg border-2 border-current p-1.5 text-brand outline-none transition hover:bg-brand-200 hover:text-brand-700 disabled:text-neutral-300 disabled:opacity-50 disabled:hover:bg-transparent ui-open:bg-brand-200 disabled:ui-open:bg-transparent"
            disabled={isOrderEmpty}
          >
            <MdOutlineShoppingCart className="h-6 w-6" />
          </Popover.Button>

          <Transition
            show={!isOrderEmpty && open}
            enter="transition"
            enterFrom="scale-90 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-90 opacity-0"
          >
            <Popover.Panel className="absolute -bottom-2 right-0 z-50 w-[560px] translate-y-full rounded-xl bg-white p-10 shadow-2xl">
              {restaurant && (
                <div className="mb-10 flex items-center justify-between gap-4 border-b border-dashed pb-2 text-xl">
                  <Image
                    className="aspect-[4/3] w-1/6"
                    src={`/images/${restaurant.logo}`}
                    alt="Logo"
                    fit="contain"
                  />
                  <h3>{restaurant.name}</h3>
                </div>
              )}
              <OrderList className="mb-10" size="sm" />
              <Link
                className="block w-full rounded-lg bg-brand p-3 text-center font-semibold text-white shadow hover:bg-brand-700"
                href="/order"
                onClick={() => close()}
              >
                Оформити замовлення
              </Link>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
