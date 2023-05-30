"use client";

import { config } from "~/lib/config";
import { formatMoney } from "~/lib/formatMoney";
import { useOrderStore } from "~/lib/store";
import { Button } from "./Button";
import { OrderCard } from "./OrderCard";

export function OrderList() {
  const [dishes] = useOrderStore((store) => [store.dishes]);

  const subtotal = Object.values(dishes).reduce(
    (acc, { price, qty }) => acc + price * qty,
    0
  );
  const delivery = Math.round(subtotal * config.deliveryPercentage) / 100;
  const total = subtotal + delivery;

  return (
    <>
      <ul className="space-y-6 mb-14">
        {Object.keys(dishes).map((id) => (
          <li key={id}>
            <OrderCard id={id} />
          </li>
        ))}
      </ul>
      <div className="divide-y-2 divide-dashed mb-14">
        <p className="flex justify-between py-3 text-xl text-gray-600">
          <span>Підсумок</span>
          <span>{formatMoney(subtotal)}</span>
        </p>
        <p className="flex justify-between py-3 text-xl text-gray-600">
          <span>Доставка</span>
          <span>{formatMoney(delivery)}</span>
        </p>
        <p className="flex justify-between py-3 text-3xl font-semibold">
          <span className="uppercase">Cума</span>
          <span>{formatMoney(total)}</span>
        </p>
      </div>
      <Button className="w-full font-semibold">Підтвердити замовлення</Button>
    </>
  );
}
