import { Dish } from '@prisma/client';
import { MdAdd, MdDeleteForever, MdRemove } from 'react-icons/md';
import { tv, type VariantProps } from 'tailwind-variants';
import { config } from '~/lib/config';
import { formatMoney } from '~/lib/utils';
import { IconButton, Image } from './common';

const orderCard = tv({
  slots: {
    base: 'flex w-full items-center',
    image: 'aspect-[4/3] shrink-0 sm:aspect-[16/9]',
    bodyWrap:
      'flex grow items-center justify-between gap-2 py-1 sm:gap-4 sm:py-2',
    name: 'mb-1 line-clamp-1 font-semibold uppercase sm:mb-2',
    price: 'text-md font-semibold sm:text-lg',
    quantityWrap:
      'relative mb-1 ml-auto flex items-center justify-between sm:mb-2',
    quantity:
      'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center',
    total: 'text-gray-600 text-center',
  },
  variants: {
    size: {
      sm: {
        image: 'mr-4 basis-16 rounded-lg sm:basis-32',
        name: 'text-md sm:text-lg',
        quantityWrap: 'w-20',
        quantity: 'text-md sm:text-lg',
      },
      md: {
        base: 'overflow-hidden rounded-xl bg-white shadow-md',
        image: 'basis-24 sm:basis-40',
        bodyWrap: 'px-2 sm:px-6',
        name: 'text-lg sm:text-xl',
        quantityWrap: 'w-20 sm:w-24',
        quantity: 'text-lg sm:text-xl',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type OrderCardVariants = VariantProps<typeof orderCard>;

interface OrderCardProps extends OrderCardVariants {
  className?: string;
  data: Dish & { quantity: number };
  disabled?: boolean;
  onAdd: () => void;
  onDel: () => void;
}

export function OrderCard({
  className,
  data: { name, price, quantity, image },
  disabled,
  size,
  onAdd,
  onDel,
}: OrderCardProps) {
  const classes = orderCard({ size });

  return (
    <div className={classes.base({ className })}>
      <Image
        className={classes.image()}
        src={`/images/${image}`}
        alt={name}
        sizes="(max-width: 1023px) 30vw, 15vw"
      />
      <div className={classes.bodyWrap()}>
        <div>
          <h3 className={classes.name()}>{name}</h3>
          <p className={classes.price()}>{formatMoney(price)}</p>
        </div>
        <div>
          <div className={classes.quantityWrap()}>
            <IconButton
              size={size}
              icon={quantity <= 1 ? MdDeleteForever : MdRemove}
              disabled={disabled}
              onClick={onDel}
            />
            <span className={classes.quantity()}>{quantity}</span>
            <IconButton
              icon={MdAdd}
              size={size}
              disabled={
                quantity >= config.dishes.maxOrderedQuantity || disabled
              }
              onClick={onAdd}
            />
          </div>
          <p className={classes.total()}>{formatMoney(price * quantity)}</p>
        </div>
      </div>
    </div>
  );
}
