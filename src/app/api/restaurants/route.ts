import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function GET() {
  const data = await prisma.restaurant.findMany({
    orderBy: { orders: { _count: 'desc' } },
  });
  return NextResponse.json(data);
}
