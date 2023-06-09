import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { config } from '~/lib/config';
import { prisma } from '~/lib/prisma';
import { SearchDishesSchema } from '~/lib/schemas';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const {
      rest,
      ids,
      search,
      sort = 'name',
      order = 'asc',
      page = 1,
      limit = config.dishes.pageSize,
    } = SearchDishesSchema.parse(Object.fromEntries(searchParams.entries()));

    const data = await prisma.dish.findMany({
      where: {
        restaurantId: rest,
        id: { in: ids },
        name: search ? { contains: search, mode: 'insensitive' } : undefined,
      },
      orderBy:
        sort === 'name'
          ? { name: order }
          : sort === 'popularity'
          ? [{ orders: { _count: order } }, { name: 'asc' }]
          : [{ [sort]: order }, { name: 'asc' }],
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('❗️', error.issues);
      return NextResponse.json(
        { message: 'Invalid search parameters' },
        { status: 400 }
      );
    }
    throw error;
  }
}
