import { NextResponse } from "next/server";
import { config } from "~/lib/config";
import { prisma } from "~/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("rest") || undefined;
  let page = Number(searchParams.get("page"));
  let limit = Number(searchParams.get("limit"));

  page = isNaN(page) ? 1 : page;
  limit = isNaN(limit) ? config.dishesPageSize : limit;

  const data = await prisma.dish.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: { restaurantId },
  });
  return NextResponse.json(data);
}
