import { PrismaClient } from '@prisma/client';

import celentano from './celentano.json';
import kfc from './kfc.json';
import lvivcroissants from './lviv-croissants.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.dish.deleteMany();
  await prisma.restaurant.deleteMany();

  await Promise.all(
    [celentano, kfc, lvivcroissants].map(async ({ restaurant, dishes }) => {
      const newRest = await prisma.restaurant.create({
        data: { ...restaurant, dishes: { create: dishes } },
      });
      console.log('🚧', newRest);
    })
  );
  console.log('🚧', 'DONE');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
