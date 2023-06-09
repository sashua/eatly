import { Dish, Restaurant } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LatLng = { lat: number; lng: number };
type OrderDish = Dish & {
  quantity: number;
};

type OrderState = {
  clientName: string;
  clientEmail: string;
  deliveryAddress: string;
  deliveryLocation: LatLng | null;
  restaurantAddress: string | null;
  restaurantLocation: LatLng | null;
  deliveryDistance: number | null;
  dishes: OrderDish[];
};

type OrderAction = {
  addOneDish: (dish: Dish) => void;
  delOneDish: (dish: Dish) => void;
};

const initialState: OrderState = {
  clientName: '',
  clientEmail: '',
  deliveryAddress: '',
  deliveryLocation: null,
  restaurantAddress: null,
  restaurantLocation: null,
  deliveryDistance: null,
  dishes: [],
};

export const useOrderStore = create<OrderState & OrderAction>()(
  persist(
    (set, get) => ({
      ...initialState,

      addOneDish: dish => {
        const dishes = [...get().dishes];
        const index = dishes.findIndex(item => item.id === dish.id);
        if (index >= 0) {
          dishes[index].quantity += 1;
        } else {
          dishes.push({ ...dish, quantity: 1 });
        }
        set({ dishes });
      },
      delOneDish: dish => {
        const dishes = get().dishes.reduce((acc, item) => {
          if (item.id === dish.id) {
            item.quantity -= 1;
          }
          if (item.quantity > 0) {
            acc.push(item);
          }
          return acc;
        }, [] as OrderDish[]);
        set({ dishes });
      },
    }),
    { name: 'order-storage' }
  )
);
