import { Restaurant } from "@prisma/client";
import Image from "next/image";

interface RestCardProps {
  data: Restaurant;
}

export function RestCard({ data: { name, logo } }: RestCardProps) {
  return (
    <button className="block w-full p-6 bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div className="relative aspect-[4]">
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
