import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await prisma.restaurant.findUnique({ where: { id: params.id } });
  return NextResponse.json(data);
}
