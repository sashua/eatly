'use client';

import { formatMoney } from '~/lib/utils';

export function OrderList() {
  const subtotal = 0;
  const delivery = 0;
  const total = 0;

  return (
    <div className="divide-y-2 divide-dashed">
      <p className="text-gray-400 flex justify-between py-3 text-xl">
        <span>Підсумок</span>
        <span>{formatMoney(subtotal)}</span>
      </p>
      <p className="text-gray-400 flex justify-between py-3 text-xl">
        <span>Доставка</span>
        <span>{formatMoney(delivery)}</span>
      </p>
      <p className="flex justify-between py-3 text-2xl font-semibold">
        <span className="uppercase">Cума</span>
        <span>{formatMoney(total)}</span>
      </p>
    </div>
  );
}
