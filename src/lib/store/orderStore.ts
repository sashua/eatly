import { Dish } from "@prisma/client";
import { LatLng } from "use-places-autocomplete";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { config } from "../config";

export interface OrderLocation {
  address: string;
  latLng: LatLng;
}

interface OrderContacts {
  name: string;
  phone: string;
  email: string;
}

export interface OrderDish extends Dish {
  qty: number;
}

type OrderState = {
  restaurantId: string | null;
  contacts: OrderContacts;
  restaurantLocation: OrderLocation | null;
  clientLocation: OrderLocation | null;
  deliveryRoute: google.maps.DirectionsResult | null;
  dishes: Record<OrderDish["id"], OrderDish>;
};

type OrderAction = {
  setRestaurant: (id: string | null) => void;
  updateContacts: (data: Partial<OrderContacts>) => void;
  setRestaurantLocation: (location: OrderLocation | null) => void;
  setClientLocation: (location: OrderLocation | null) => void;
  setDeliveryRoute: (route: google.maps.DirectionsResult | null) => void;
  addDish: (dish: Dish) => void;
  setDishQty: (id: string, qty: number) => void;
  deleteDish: (id: string) => void;
  clearOrder: () => void;
};

const defaultState: OrderState = {
  restaurantId: null,
  contacts: { name: "", phone: "", email: "" },
  restaurantLocation: null,
  clientLocation: null,
  deliveryRoute: null,
  dishes: {},
};

export const useOrderStore = create(
  persist(
    immer<OrderState & OrderAction>((set) => ({
      ...defaultState,

      // ---- order actions ----
      setRestaurant: (id?) =>
        set((store) => {
          if (Object.keys(store.dishes).length) {
            return;
          }
          store.restaurantId = id;
        }),

      updateContacts: (data) =>
        set((store) => {
          store.contacts = { ...store.contacts, ...data };
        }),

      setRestaurantLocation: (location) =>
        set((store) => {
          store.restaurantLocation = location;
        }),

      setClientLocation: (location) =>
        set((store) => {
          store.clientLocation = location;
        }),

      setDeliveryRoute: (route) =>
        set((store) => {
          store.deliveryRoute = route;
        }),

      // ---- dishes actions ----
      addDish: (dish) =>
        set((store) => {
          if (!store.restaurantId) {
            store.restaurantId = dish.restaurantId;
          }
          if (dish.restaurantId !== store.restaurantId) {
            return;
          }
          store.dishes[dish.id] = { ...dish, qty: 1 };
        }),

      deleteDish: (id) =>
        set((store) => {
          delete store.dishes[id];
          if (!Object.keys(store.dishes).length) {
            store.restaurantId = null;
            store.restaurantLocation = null;
            store.deliveryRoute = null;
          }
        }),

      setDishQty: (id, qty) =>
        set((store) => {
          store.dishes[id].qty =
            qty < 1 ? 1 : qty > config.dishMaxQty ? config.dishMaxQty : qty;
        }),

      clearOrder: () => set((store) => (store = { ...store, ...defaultState })),
    })),
    { name: "order-store" }
  )
);
