"use client";

import { Dish } from "@prisma/client";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { config } from "~/lib/config";
import { fetcher } from "~/lib/fetcher";
import { getApiUrl } from "~/lib/getApiUrl";
import { useFilterStore } from "~/lib/store";
import { Button } from "./Button";
import { DishCard } from "./DishCard";

interface DishListProps {
  fallbackData: Dish[];
}

export function DishList({ fallbackData }: DishListProps) {
  const [filter, updateFilter] = useFilterStore((store) => [
    store.filter,
    store.update,
  ]);

  const getKey = useCallback(
    (page: number, prevData: Dish[] | null) => {
      if (prevData && prevData.length < config.dishesPageSize) return null;
      return getApiUrl("dishes", { ...filter, page: String(page + 1) });
    },
    [filter]
  );

  const { data, isValidating, setSize } = useSWRInfinite<Dish[]>(
    getKey,
    fetcher,
    {
      fallbackData: [fallbackData],
      revalidateFirstPage: false,
    }
  );

  const handleLoadMore = () => {
    setSize((size) => size + 1);
  };

  const dishes = data?.flat();
  const hasNextPage = (data?.at(-1)?.length ?? 0) >= config.dishesPageSize;

  console.log("🚧", isValidating);

  return (
    <div className="space-y-10">
      <ul className="grid grid-cols-4 gap-10">
        {dishes?.map((data) => (
          <li key={data.id}>
            <DishCard data={data} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button
          className="mx-auto"
          disabled={isValidating}
          onClick={handleLoadMore}
        >
          {isValidating ? "Зачекайте..." : "Більше страв"}
        </Button>
      )}
    </div>
  );
}
