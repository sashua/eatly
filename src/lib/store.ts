import { Dish } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { config } from "./config";

type FilterState = {
  filter: {
    rest?: string;
    sort?: "name" | "price";
    order?: "asc" | "desc";
  };
};

type FilterAction = {
  update: (filter: FilterState["filter"]) => void;
};

export const useFilterStore = create<FilterState & FilterAction>((set) => ({
  filter: {},
  update: (filter) => set(() => ({ filter: { ...filter } })),
}));

interface OrderDish extends Dish {
  qty: number;
}

type OrderState = {
  dishes: Record<OrderDish["id"], OrderDish>;
};

type OrderAction = {
  addDish: (dish: Dish) => void;
  delDish: (id: string) => void;
  incDish: (id: string) => void;
  decDish: (id: string) => void;
};

export const useOrderStore = create(
  immer<OrderState & OrderAction>((set) => ({
    dishes: {},
    addDish: (dish) =>
      set((store) => {
        store.dishes[dish.id] = { ...dish, qty: 1 };
      }),
    delDish: (id) =>
      set((store) => {
        delete store.dishes[id];
      }),
    incDish: (id) =>
      set((store) => {
        const qty = store.dishes[id].qty + 1;
        if (qty <= config.dishMaxQty) {
          store.dishes[id].qty = qty;
        }
      }),
    decDish: (id) =>
      set((store) => {
        const qty = store.dishes[id].qty - 1;
        if (qty >= 1) {
          store.dishes[id].qty = qty;
        }
      }),
  }))
);
