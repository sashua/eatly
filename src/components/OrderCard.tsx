import { Dish } from '@prisma/client';
import { MdAdd, MdDeleteForever, MdRemove } from 'react-icons/md';
import { tv, type VariantProps } from 'tailwind-variants';
import { config } from '~/lib/config';
import { formatMoney } from '~/lib/utils';
import { IconButton, Image } from './common';

const orderCard = tv({
  slots: {
    base: 'flex w-full items-center',
    image: 'aspect-[3/2] shrink-0',
    bodyWrap: 'flex grow items-center justify-between gap-4 py-2',
    name: 'mb-2 line-clamp-1 font-semibold uppercase',
    price: 'text-lg font-semibold',
    quantityWrap: 'relative mb-2 ml-auto flex items-center justify-between',
    quantity:
      'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-center',
    total: 'text-gray-600 text-center',
  },
  variants: {
    size: {
      sm: {
        image: 'mr-4 basis-32 rounded-lg',
        name: 'text-lg',
        quantityWrap: 'w-20',
        quantity: 'text-lg',
      },
      md: {
        base: 'overflow-hidden rounded-xl bg-white shadow-md',
        image: 'basis-40',
        bodyWrap: 'px-6',
        name: 'text-xl',
        quantityWrap: 'w-24',
        quantity: 'text-xl',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type OrderCardVariants = VariantProps<typeof orderCard>;

interface OrderCardProps extends OrderCardVariants {
  className?: string;
  data: Dish & { quantity: number };
  onAdd: () => void;
  onDel: () => void;
}

export function OrderCard({
  className,
  data: { name, price, quantity, image },
  size,
  onAdd,
  onDel,
}: OrderCardProps) {
  const classes = orderCard({ size });

  return (
    <div className={classes.base({ className })}>
      <Image className={classes.image()} src={`/images/${image}`} alt={name} />
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
              onClick={onDel}
            />
            <span className={classes.quantity()}>{quantity}</span>
            <IconButton
              icon={MdAdd}
              size={size}
              disabled={quantity >= config.dishes.maxOrderedQuantity}
              onClick={onAdd}
            />
          </div>
          <p className={classes.total()}>{formatMoney(price * quantity)}</p>
        </div>
      </div>
    </div>
  );
}
