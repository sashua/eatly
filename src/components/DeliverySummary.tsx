import { Restaurant } from '@prisma/client';
import { Image } from './common';

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
    <div className="bg-gray-800 rounded-t-3xl px-6 pb-6 pt-10 text-white">
      <div className="flex items-start justify-between gap-4">
        {restaurant && (
          <Image
            className="aspect-[3] shrink-0 basis-1/5 grayscale invert"
            src={`/images/${restaurant.logo}`}
            alt={restaurant.name}
            fit="contain"
          />
        )}

        {restaurantAddress && (
          <div className="shrink-0 basis-1/2 space-y-1 text-center">
            <h5 className="text-gray-400 text-sm">Найближчий ресторан</h5>
            <p className="line-clamp-1 text-xs font-light">
              {restaurantAddress}
            </p>
          </div>
        )}
        {summary && (
          <div className="space-y-1 text-center">
            <h5 className="text-gray-400 text-sm">Доставка</h5>
            <p className="line-clamp-2 text-xs font-light">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
