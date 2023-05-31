import { Dish } from "@prisma/client";
import { LatLng } from "use-places-autocomplete";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { config } from "../config";

interface Location {
  address: string;
  latLng: LatLng;
}

export interface OrderDish extends Dish {
  qty: number;
}

type OrderState = {
  restaurantId?: string;
  restaurantLocation?: Location;
  clientLocation?: Location;
  deliveryRoute?: google.maps.DirectionsResult | null;
  dishes: Record<OrderDish["id"], OrderDish>;
};

type OrderAction = {
  setRestaurant: (id: string) => void;
  setRestaurantLocation: (location?: Location) => void;
  setClientLocation: (location?: Location) => void;
  setDeliveryRoute: (route?: google.maps.DirectionsResult | null) => void;
  addDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  setDishQty: (id: string, qty: number) => void;
};

export const useOrderStore = create(
  immer<OrderState & OrderAction>((set) => ({
    dishes: {},

    // ---- order actions ----
    setRestaurant: (id?) =>
      set((store) => {
        if (Object.keys(store.dishes).length) {
          return;
        }
        store.restaurantId = id;
      }),

    setRestaurantLocation: (location?) =>
      set((store) => {
        store.restaurantLocation = location;
      }),

    setClientLocation: (location?) =>
      set((store) => {
        store.clientLocation = location;
      }),

    setDeliveryRoute: (route?) =>
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
          store.restaurantId = undefined;
          store.restaurantLocation = undefined;
          store.deliveryRoute = undefined;
        }
      }),

    setDishQty: (id, qty) =>
      set((store) => {
        store.dishes[id].qty =
          qty < 1 ? 1 : qty > config.dishMaxQty ? config.dishMaxQty : qty;
      }),
  }))
);
