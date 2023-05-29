import { Dish } from "@prisma/client";
import Image from "next/image";

interface DishCardProps {
  data: Dish;
}

export function DishCard({ data: { name, image } }: DishCardProps) {
  return (
    <div className="px-3 py-4">
      <div>
        <Image src={image} alt={name} />
      </div>
    </div>
  );
}
