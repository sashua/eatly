import { Dish } from "@prisma/client";
import Image from "next/image";

interface DishCardProps {
  data: Dish;
}

export function DishCard({
  data: { name, description, price, image },
}: DishCardProps) {
  return (
    <div className="flex flex-col shadow-xl rounded-2xl overflow-hidden bg-white h-full">
      <div className="relative aspect-[3/2]">
        <Image
          className="object-cover"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="pt-4 px-6 py-6 flex flex-col gap-4 justify-between grow">
        <h3 className="font-semibold text-xl uppercase">{name}</h3>
        <p className="text-xs text-gray-400">{description}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl">{price.toFixed(2)} ₴</p>
          <button className="w-10 rounded-lg h-10 flex items-center justify-center text-2xl bg-violet-700 text-white shadow hover:bg-violet-600 active:bg-violet-700">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
