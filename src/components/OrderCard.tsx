import { Dish } from "@prisma/client";
import Image from "next/image";
import { MdAdd, MdDeleteForever, MdRemove } from "react-icons/md";
import { config } from "~/lib/config";
import { formatMoney } from "~/lib/formatMoney";
import { useOrderStore } from "~/lib/store";
import { IconButton } from "./IconButton";

interface OrderCardProps {
  id: Dish["id"];
}

export function OrderCard({ id }: OrderCardProps) {
  const [dish, inc, dec, del] = useOrderStore((store) => [
    store.dishes[id],
    store.incDish,
    store.decDish,
    store.delDish,
  ]);
  const { name, price, qty, image } = dish;
  const sum = price * qty;

  return (
    <div className="flex items-center shadow-md rounded-xl overflow-hidden bg-white w-full">
      <div className="relative aspect-[3/2] basis-40 shrink-0">
        <Image
          className="object-cover"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="flex gap-4 grow py-2 px-4 justify-between items-center">
        <div className="space-y-2">
          <h3 className="font-semibold text-xl uppercase line-clamp-1">
            {name}
          </h3>
          <p className="font-semibold text-lg">{formatMoney(price)}</p>
        </div>
        <div className="space-y-2">
          <div className="relative ml-auto flex items-center justify-between w-28">
            <IconButton
              variant="outline"
              icon={qty <= 1 ? MdDeleteForever : MdRemove}
              onClick={() => (qty <= 1 ? del(id) : dec(id))}
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl pointer-events-none select-none">
              {String(qty).padStart(2, "0")}
            </span>
            <IconButton
              icon={MdAdd}
              disabled={qty >= config.dishMaxQty}
              onClick={() => inc(id)}
            />
          </div>
          <p className="text-center text-gray-600">{formatMoney(sum)}</p>
        </div>
      </div>
    </div>
  );
}
