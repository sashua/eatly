import { ComponentPropsWithoutRef } from 'react';
import { IconType } from 'react-icons';
import { tv, type VariantProps } from 'tailwind-variants';

const iconButton = tv({
  slots: {
    base: 'border-brand text-brand transition-colors hover:border-brand-700 hover:bg-brand-700 hover:text-white active:border-brand active:bg-brand disabled:border-neutral-300 disabled:text-neutral-300 disabled:shadow-none disabled:hover:bg-transparent',
    icon: 'h-[1.5em] w-[1.5em]',
  },
  variants: {
    size: {
      sm: {
        base: 'rounded-full border p-1 shadow-sm',
        icon: 'h-[1em] w-[1em]',
      },
      md: {
        base: 'rounded-lg border p-1 shadow sm:p-1.5',
        icon: 'h-[1.25em] w-[1.25em]',
      },
      lg: {
        base: 'rounded-xl border-2 p-1 shadow-md sm:p-1.5',
        icon: 'h-[1.5em] w-[1.5em]',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type ButtonVariants = VariantProps<typeof iconButton>;

interface IconButtonProps
  extends ButtonVariants,
    Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  icon: IconType;
}

export function IconButton({
  className,
  size,
  type = 'button',
  icon: Icon,
  ...props
}: IconButtonProps) {
  const classes = iconButton({ size });

  return (
    <button className={classes.base({ className })} type={type} {...props}>
      <Icon className={classes.icon()} />
    </button>
  );
}
