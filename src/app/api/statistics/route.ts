import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function GET() {
  const [restaurants, dishes, orders] = await Promise.all([
    prisma.restaurant.aggregate({
      _count: true,
    }),
    prisma.dish.aggregate({ _count: true }),
    prisma.order.aggregate({ _count: true }),
  ]);

  return NextResponse.json({
    restaurants: restaurants._count,
    dishes: dishes._count,
    orders: Math.max(orders._count, 1000),
  });
}
