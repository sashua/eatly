"use client";

import { Restaurant } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useFilterStore } from "~/lib/store";

interface RestCardProps {
  data: Restaurant;
}

export function RestCard({ data: { id, name, logo } }: RestCardProps) {
  const [restrauntId, updateFilter] = useFilterStore((store) => [
    store.filter.rest,
    store.update,
  ]);

  const isActive = id === restrauntId;

  const handleClick = () => {
    updateFilter({ rest: isActive ? "" : id });
  };

  return (
    <button
      className={clsx(
        "group block w-full p-6 bg-white shadow-xl rounded-2xl overflow-hidden hover:bg-violet-50 transition-colors",
        isActive && "outline outline-violet-500/50"
      )}
      onClick={handleClick}
    >
      <div className="relative aspect-[3] group-disabled:opacity-50 group-disabled:grayscale">
        <Image
          className="object-contain"
          src={`/images/${logo}`}
          alt={name}
          fill
        />
      </div>
    </button>
  );
}
