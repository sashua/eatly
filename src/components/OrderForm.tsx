"use client";

import { useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { config } from "~/lib/config";
import { useClosestRestaurant } from "~/lib/hooks";
import { useOrderStore } from "~/lib/store";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { Button } from "./Button";
import { DeliverySummary } from "./DeliverySummary";
import { Input } from "./Input";
import { Map } from "./Map";
import { OrderList } from "./OrderList";

const libraries = ["places"] as "places"[];

interface OrderFormProps {}

export function OrderForm({}: OrderFormProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    language: "uk",
    libraries: libraries,
  });
  const [dishes] = useOrderStore((store) => [Object.values(store.dishes)]);
  const [map, setMap] = useState<google.maps.Map>();
  const { restaurant, restaurantLocation, deliveryRoute } =
    useClosestRestaurant(map);

  const { duration, distance } = deliveryRoute?.routes[0].legs[0] ?? {};
  const subtotal = dishes.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const deliverySum =
    Math.round(distance?.value ?? (0 * config.deliveryCostPerKm) / 10) / 100;
  const total = subtotal + deliverySum;

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="relative">
        <div className="overflow-hidden bg-gray-200 rounded-2xl aspect-video">
          {isLoaded && <Map onLoad={setMap} />}
        </div>
        <div className="absolute bottom-0 w-full max-w-lg -translate-x-1/2 translate-y-1/2 bg-white shadow-xl rounded-3xl left-1/2">
          <DeliverySummary
            restaurant={restaurant}
            restaurantAddress={restaurantLocation?.address}
            summary={duration ? `${duration?.text}(${distance?.text})` : ""}
          />
          <div className="flex flex-col gap-4 px-6 pt-6 pb-10">
            {isLoaded ? (
              <AddressAutocomplete
                className="z-30"
                placeholder="Адреса доставки"
              />
            ) : (
              <Input placeholder="Адреса доставки" disabled />
            )}
            <Input placeholder="Ім'я" />
            <Input type="tel" placeholder="Телефон" />
            <Input type="email" placeholder="Email" />
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-64 space-y-10">
        <OrderList
          dishes={dishes}
          subtotal={subtotal}
          delivery={deliverySum}
          total={total}
        />
        <Button className="w-full font-semibold">Підтвердити замовлення</Button>
      </div>
    </form>
  );
}
