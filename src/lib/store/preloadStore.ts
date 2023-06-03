import { Dish, Restaurant } from '@prisma/client';
import { create } from 'zustand';

export type PreloadState = {
  restaurants: Restaurant[];
  dishes: Dish[];
};

type PreloadAction = {
  set: (values: PreloadState) => void;
};

export const usePreloadStore = create<PreloadState & PreloadAction>(set => ({
  restaurants: [],
  dishes: [],
  set: values => set(() => ({ ...values })),
}));
