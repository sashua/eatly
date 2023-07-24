import { Dish } from '@prisma/client';
import merge from 'deepmerge';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type OrderDish = Dish & {
  quantity: number;
};

type OrderState = {
  name: string;
  phone: string;
  address: string;
  location?: google.maps.LatLngLiteral | null;
  restaurantAddress?: string | null;
  restaurantLocation?: google.maps.LatLngLiteral | null;
  deliveryTime?: google.maps.Duration | null;
  deliveryDistance?: google.maps.Distance | null;
  dishes: OrderDish[];
  _hasHydrated: boolean;
};

type OrderAction = {
  setClientInfo: (
    info: Partial<Pick<OrderState, 'name' | 'phone' | 'address'>>
  ) => void;
  setLocationInfo: (
    info: Partial<
      Pick<OrderState, 'location' | 'restaurantAddress' | 'restaurantLocation'>
    >
  ) => void;
  setDeliveryInfo: (
    info: Partial<Pick<OrderState, 'deliveryTime' | 'deliveryDistance'>>
  ) => void;
  addOneDish: (dish: Dish) => void;
  delOneDish: (dish: Dish) => void;
  clearOrder: () => void;
  _setHasHydrated: (status: boolean) => void;
};

const initialState: OrderState = {
  name: '',
  phone: '',
  address: '',
  location: null,
  restaurantAddress: null,
  restaurantLocation: null,
  deliveryTime: null,
  deliveryDistance: null,
  dishes: [],
  _hasHydrated: false,
};

export const useOrderStore = create<OrderState & OrderAction>()(
  persist(
    (set, get) => ({
      ...initialState,

      setClientInfo: info => set({ ...info }),
      setLocationInfo: info => set({ ...info }),
      setDeliveryInfo: info => set({ ...info }),

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

      clearOrder: () => set(initialState),

      _setHasHydrated: status =>
        set({
          _hasHydrated: status,
        }),
    }),
    {
      name: 'order-storage',
      merge: (persisted, current) =>
        merge(current, persisted as OrderState & OrderAction),
      onRehydrateStorage: () => s => s?._setHasHydrated(true),
    }
  )
);
