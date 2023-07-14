import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { CreateOrderSchema } from '~/lib/schemas';

export async function POST(request: Request) {
  const { dishes, ...orderData } = CreateOrderSchema.parse(
    await request.json()
  );

  const res = await prisma.order.create({
    data: {
      ...orderData,
      dishes: {
        create: dishes.map(({ id, ...dishData }) => ({
          ...dishData,
          dish: { connect: { id } },
        })),
      },
    },
    include: { dishes: true },
  });

  return NextResponse.json({});
}
