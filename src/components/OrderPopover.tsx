'use client';

import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useOrderDishesQuery, useRestaurantQuery } from '~/lib/hooks';
import { useOrderStore } from '~/lib/store';
import { formatMoney } from '~/lib/utils';
import { Image } from './Image';
import { OrderCard } from './OrderCard';

export function OrderPopover() {
  const { data: dishes } = useOrderDishesQuery();
  const { data: restaurant } = useRestaurantQuery(dishes[0]?.restaurantId);
  const addOneDish = useOrderStore(s => s.addOneDish);
  const delOneDish = useOrderStore(s => s.delOneDish);

  const subtotal = dishes.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );
  return (
    <Popover className="relative z-30">
      {({ open, close }) => (
        <>
          <Popover.Button
            className="rounded-lg border-2 border-current p-1.5 text-brand outline-none transition hover:bg-brand-200 hover:text-brand-700 disabled:text-neutral-300 disabled:opacity-50 disabled:hover:bg-transparent ui-open:bg-brand-200 disabled:ui-open:bg-transparent"
            disabled={dishes.length === 0}
          >
            <MdOutlineShoppingCart className="h-6 w-6" />
          </Popover.Button>

          <Transition
            show={open && dishes.length > 0}
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
              <ul className="mb-10 space-y-4">
                {dishes?.map(data => (
                  <li key={data.id}>
                    <OrderCard
                      data={data}
                      size="sm"
                      onAdd={() => addOneDish(data)}
                      onDel={() => delOneDish(data)}
                    />
                  </li>
                ))}
              </ul>
              <p className="mb-10 flex justify-between border-b border-dashed pb-2 text-xl font-semibold">
                <span>Підсумок</span>
                <span>{formatMoney(subtotal)}</span>
              </p>
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
