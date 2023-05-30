import { Dish } from "@prisma/client";
import Image from "next/image";
import { MdAdd, MdDone } from "react-icons/md";
import { formatMoney } from "~/lib/formatMoney";
import { useOrderStore } from "~/lib/store";
import { IconButton } from "./IconButton";

interface DishCardProps {
  data: Dish;
}

export function DishCard({ data }: DishCardProps) {
  const [isOrdered, addDish] = useOrderStore((store) => [
    Boolean(store.dishes[data.id]),
    store.addDish,
  ]);

  const handleAdd = () => {
    addDish(data);
  };

  const { name, description, price, image } = data;

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
          <p className="font-semibold text-2xl">{formatMoney(price)}</p>
          <IconButton
            icon={isOrdered ? MdDone : MdAdd}
            disabled={isOrdered}
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  );
}
