import { Dish, Restaurant } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LatLng = { lat: number; lng: number };

type OrderState = {
  clientName: string;
  clientEmail: string;
  deliveryAddress: string;
  deliveryLocation: LatLng | null;
  restaurantAddress: string | null;
  restaurantLocation: LatLng | null;
  deliveryDistance: number | null;
  restaurantId: Restaurant['id'] | null;
  dishes: {
    id: Dish['id'];
    quantity: number;
  }[];
};

type OrderAction = {
  addDish: (dish: Dish) => void;
};

const initialState: OrderState = {
  clientName: '',
  clientEmail: '',
  deliveryAddress: '',
  deliveryLocation: null,
  restaurantAddress: null,
  restaurantLocation: null,
  deliveryDistance: null,
  restaurantId: null,
  dishes: [],
};

export const useOrderStore = create<OrderState & OrderAction>()(
  persist(
    (set, get) => ({
      ...initialState,

      addDish: dish => {
        set({
          restaurantId: dish.restaurantId,
          dishes: [...get().dishes, { id: dish.id, quantity: 1 }],
        });
      },
    }),
    { name: 'order-storage' }
  )
);
