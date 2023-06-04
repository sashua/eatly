import { ComponentPropsWithoutRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'rounded-2xl border-2 border-brand px-6 py-4 font-medium shadow-md transition-colors hover:border-brand-700 active:border-brand disabled:border-neutral disabled:shadow-none',
  variants: {
    variant: {
      solid:
        'bg-brand text-white hover:bg-brand-700 active:bg-brand disabled:bg-neutral',
      outline:
        'text-brand hover:bg-brand-100 active:bg-white disabled:bg-white disabled:text-neutral',
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
