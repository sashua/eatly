import { Dish } from "@prisma/client";
import Image from "next/image";
import { MdAdd, MdDeleteForever, MdRemove } from "react-icons/md";
import { config } from "~/lib/config";
import { OrderDish, useOrderStore } from "~/lib/store";
import { formatMoney } from "~/lib/utils";
import { IconButton } from "./IconButton";

interface OrderCardProps {
  data: OrderDish;
}

export function OrderCard({ data }: OrderCardProps) {
  const [setQty, deleteDish] = useOrderStore((store) => [
    store.setDishQty,
    store.deleteDish,
  ]);
  const { id, name, price, qty, image } = data;
  const sum = price * qty;

  return (
    <div className="flex items-center w-full overflow-hidden bg-white shadow-md rounded-xl">
      <div className="relative aspect-[3/2] basis-40 shrink-0">
        <Image
          className="object-cover"
          src={`/images/${image}`}
          alt={name}
          fill
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-4 py-2 grow">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold uppercase line-clamp-1">
            {name}
          </h3>
          <p className="text-lg font-semibold">{formatMoney(price)}</p>
        </div>
        <div className="space-y-2">
          <div className="relative flex items-center justify-between ml-auto w-28">
            <IconButton
              variant="outline"
              icon={qty <= 1 ? MdDeleteForever : MdRemove}
              onClick={() => (qty <= 1 ? deleteDish(id) : setQty(id, qty - 1))}
            />
            <span className="absolute text-xl text-center -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none top-1/2 left-1/2">
              {String(qty).padStart(2, "0")}
            </span>
            <IconButton
              icon={MdAdd}
              disabled={qty >= config.dishMaxQty}
              onClick={() => setQty(id, qty + 1)}
            />
          </div>
          <p className="text-center text-gray-600">{formatMoney(sum)}</p>
        </div>
      </div>
    </div>
  );
}
