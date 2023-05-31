import { create } from "zustand";

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
