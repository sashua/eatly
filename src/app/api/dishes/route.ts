import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '~/lib/prisma';
import { SearchDishes } from '~/lib/schemas';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { rest, search, sort, order, page, limit } = SearchDishes.parse(
      Object.fromEntries(searchParams.entries())
    );

    const data = await prisma.dish.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        restaurantId: rest,
        name: search ? { contains: search, mode: 'insensitive' } : undefined,
      },
      orderBy: { [sort]: sort === 'orders' ? { _count: order } : order },
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
    if (error instanceof Error) {
      console.log('❗️', error.message);
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}
