import { Dish, Restaurant } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { MdAdd, MdBlock, MdDone } from "react-icons/md";
import { useOrderStore } from "~/lib/store";
import { formatMoney } from "~/lib/utils";
import { IconButton } from "./IconButton";

interface DishCardProps {
  data: Dish;
}

export function DishCard({ data }: DishCardProps) {
  const { name, description, price, image, restaurantId } = data;

  const [isDisabled, isOrdered, addDish] = useOrderStore((store) => [
    (store.restaurantId ?? restaurantId) !== restaurantId,
    Boolean(store.dishes[data.id]),
    store.addDish,
  ]);

  const handleAdd = () => {
    addDish(data);
  };

  return (
    <div
      className={clsx(
        "flex flex-col h-full overflow-hidden bg-white shadow-xl rounded-2xl",
        isDisabled && "opacity-50"
      )}
    >
      <div className="relative aspect-[3/2]">
        <Image
          className="object-cover"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="flex flex-col justify-between gap-4 px-6 py-6 pt-4 grow">
        <h3 className="text-xl font-semibold uppercase">{name}</h3>
        <p className="text-xs text-gray-400">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{formatMoney(price)}</p>
          <IconButton
            icon={isDisabled ? MdBlock : isOrdered ? MdDone : MdAdd}
            disabled={isDisabled || isOrdered}
            onClick={handleAdd}
          />
        </div>
      </div>
    </div>
  );
}
