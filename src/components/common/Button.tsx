import { ComponentPropsWithoutRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'flex items-center justify-center gap-1.5 rounded-2xl font-medium transition-colors',
  variants: {
    variant: {
      solid:
        'border-2 border-brand bg-brand px-6 py-4 text-white shadow-md hover:border-brand-700 hover:bg-brand-700 active:border-brand active:bg-brand disabled:border-neutral-300 disabled:bg-neutral-300 disabled:shadow-none',

      outline:
        'border-2 border-brand px-6 py-4 text-brand shadow-md hover:border-brand-700 hover:bg-brand-100 active:border-brand active:bg-transparent disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-300 disabled:shadow-none',

      flat: 'p-2 text-neutral hover:text-brand-700 active:text-brand disabled:text-neutral-300',
    },
  },
  defaultVariants: { variant: 'solid' },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps
  extends ButtonVariants,
    ComponentPropsWithoutRef<'button'> {}

export function Button({
  className,
  variant,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ variant, className })} type={type} {...props}>
      {children}
    </button>
  );
}
