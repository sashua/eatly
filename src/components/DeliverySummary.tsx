import { Restaurant } from "@prisma/client";
import Image from "next/image";

interface DeliverySummaryProps {
  restaurant?: Restaurant;
  restaurantAddress?: string;
  summary?: string;
}

export function DeliverySummary({
  restaurant,
  restaurantAddress,
  summary,
}: DeliverySummaryProps) {
  return (
    <div className="px-6 pt-10 pb-6 text-white bg-gray-800 rounded-t-3xl">
      <div className="flex items-start justify-between gap-4">
        <div className="relative aspect-[3] basis-1/5 shrink-0">
          {restaurant && (
            <Image
              className="object-contain invert grayscale"
              src={`/images/${restaurant.logo}`}
              alt={restaurant.name}
              fill
            />
          )}
        </div>
        {restaurantAddress && (
          <div className="space-y-1 text-center basis-1/2 shrink-0">
            <h5 className="text-sm text-gray-400">Найближчий ресторан</h5>
            <p className="text-xs font-light line-clamp-1">
              {restaurantAddress}
            </p>
          </div>
        )}
        {summary && (
          <div className="space-y-1 text-center">
            <h5 className="text-sm text-gray-400">Доставка</h5>
            <p className="text-xs font-light line-clamp-2">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
