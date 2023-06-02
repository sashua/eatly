import console from "console";
import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function POST(request: Request) {
  const { dishes, ...orderData } = await request.json();

  const res = await prisma.order.create({
    data: {
      ...orderData,
      dishes: {
        create: dishes.map(({ dishId, ...dishData }) => ({
          ...dishData,
          dish: { connect: { id: dishId } },
        })),
      },
    },
    include: { dishes: true },
  });
  console.log("🚧 res:", res);

  return NextResponse.json(res);
}
