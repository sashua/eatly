import { NextResponse } from "next/server";
import { config } from "~/lib/config";
import { prisma } from "~/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("rest") || undefined;
  const page = searchParams.get("page") || 1;

  const skip = (Number(page) - 1) * config.dishesPageSize;
  const take = config.dishesPageSize;

  const data = await prisma.dish.findMany({
    skip,
    take,
    where: { restaurantId },
  });
  return NextResponse.json(data);
}
