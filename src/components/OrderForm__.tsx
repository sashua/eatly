// 'use client';

// import { useLoadScript } from '@react-google-maps/api';
// import { useRouter } from 'next/navigation';
// import { ChangeEvent, FormEvent, useState } from 'react';
// import { config } from '~/lib/config';
// import { useClosestRestaurant } from '~/lib/hooks';
// import { useOrderStore } from '~/lib/store';
// import { getApiUrl } from '~/lib/utils';
// import { AddressAutocomplete } from './AddressAutocomplete';
// import { Button } from './Button';
// import { DeliverySummary } from './DeliverySummary';
// import { Input } from './Input';
// import { Map } from './Map';
// import { OrderList } from './OrderList';

// const libraries = ['places'] as 'places'[];
// const postUrl = getApiUrl('orders');

export function OrderForm() {
  //   // ---- load google maps ----
  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  //     language: 'uk',
  //     libraries: libraries,
  //   });
  //   const [map, setMap] = useState<google.maps.Map>();
  //   // ---- get data from hooks ----
  //   const { restaurant, restaurantLocation, deliveryRoute } =
  //     useClosestRestaurant(map);
  //   const [
  //     contacts,
  //     clientLoaction,
  //     dishes,
  //     updateContacts,
  //     setClientLocation,
  //     clearOrder,
  //   ] = useOrderStore(store => [
  //     store.contacts,
  //     store.clientLocation,
  //     Object.values(store.dishes),
  //     store.updateContacts,
  //     store.setClientLocation,
  //     store.clearOrder,
  //   ]);
  //   const router = useRouter();
  //   // ---- calculate order totals ----
  //   const { duration, distance } = deliveryRoute?.routes[0].legs[0] ?? {};
  //   const subtotal = dishes.reduce((acc, { price, qty }) => acc + price * qty, 0);
  //   const delivery =
  //     Math.round(distance?.value ?? (0 * config.deliveryCostPerKm) / 10) / 100;
  //   const total = subtotal + delivery;
  //   // ---- handle form events ----
  //   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     updateContacts({ [e.target.name]: e.target.value });
  //   };
  //   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const data = {
  //       ...contacts,
  //       address: clientLoaction?.address,
  //       delivery,
  //       total,
  //       dishes: dishes.map(({ id, price, qty }) => ({ dishId: id, price, qty })),
  //     };
  //     try {
  //       clearOrder();
  //       router.push('/');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   return (
  //     <form autoComplete="off" onSubmit={handleSubmit}>
  //       <div className="relative">
  //         <div className="bg-gray-200 aspect-video overflow-hidden rounded-2xl">
  //           {isLoaded && <Map onLoad={setMap} />}
  //         </div>
  //         <div className="absolute bottom-0 left-1/2 w-full max-w-lg -translate-x-1/2 translate-y-1/2 rounded-3xl bg-white shadow-xl">
  //           <DeliverySummary
  //             restaurant={restaurant}
  //             restaurantAddress={restaurantLocation?.address}
  //             summary={duration ? `${duration?.text}(${distance?.text})` : ''}
  //           />
  //           <div className="flex flex-col gap-4 px-6 pb-10 pt-6">
  //             {isLoaded ? (
  //               <AddressAutocomplete
  //                 className="z-30"
  //                 name="address"
  //                 placeholder="Адреса доставки"
  //                 defaultValue={clientLoaction?.address ?? ''}
  //                 required
  //                 onSelect={setClientLocation}
  //               />
  //             ) : (
  //               <Input placeholder="Адреса доставки" disabled />
  //             )}
  //             <Input
  //               name="name"
  //               placeholder="Ім'я"
  //               value={contacts.name}
  //               required
  //               onChange={handleInputChange}
  //             />
  //             <Input
  //               name="phone"
  //               type="tel"
  //               placeholder="Телефон"
  //               value={contacts.phone}
  //               required
  //               onChange={handleInputChange}
  //             />
  //             <Input
  //               name="email"
  //               type="email"
  //               placeholder="Email"
  //               value={contacts.email}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="mx-auto mt-64 max-w-2xl space-y-10">
  //         <OrderList
  //           dishes={dishes}
  //           subtotal={subtotal}
  //           delivery={delivery}
  //           total={total}
  //         />
  //         <Button
  //           className="w-full font-semibold"
  //           type="submit"
  //           disabled={dishes.length < 1 || false}
  //         >
  //           {false ? 'Зачекайте...' : 'Підтвердити замовлення'}
  //         </Button>
  //       </div>
  //     </form>
  //   );
}
