import { Dish } from '@prisma/client';
import merge from 'deepmerge';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type OrderClientInfo = {
  name: string;
  email: string;
  address: string;
};

type OrderDish = Dish & {
  quantity: number;
};

type OrderState = {
  _hasHydrated: boolean;
  clientInfo: OrderClientInfo;
  deliveryInfo: {
    fromLocation: string | null;
    toAddress: string | null;
    toLocation: string | null;
    distance: number | null;
  };
  dishes: OrderDish[];
};

type OrderAction = {
  _setHasHydrated: (status: boolean) => void;
  setClientInfo: (info: Partial<OrderClientInfo>) => void;
  addOneDish: (dish: Dish) => void;
  delOneDish: (dish: Dish) => void;
};

const initialState: OrderState = {
  _hasHydrated: false,
  clientInfo: {
    name: '',
    email: '',
    address: '',
  },
  deliveryInfo: {
    fromLocation: null,
    toAddress: null,
    toLocation: null,
    distance: null,
  },
  dishes: [],
};

export const useOrderStore = create<OrderState & OrderAction>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        _setHasHydrated: status =>
          set({
            _hasHydrated: status,
          }),

        setClientInfo: info =>
          set({
            clientInfo: { ...get().clientInfo, ...info },
          }),

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
      {
        name: 'order-storage',
        merge: (persisted, current) =>
          merge(current, persisted as OrderState & OrderAction),
        onRehydrateStorage: () => s => s?._setHasHydrated(true),
      }
    ),
    { enabled: true }
  )
);
