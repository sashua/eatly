import { ComponentPropsWithoutRef } from 'react';
import { IconType } from 'react-icons';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  slots: {
    base: 'flex items-center gap-1.5 rounded-2xl font-medium transition-colors',
  },
  variants: {
    variant: {
      solid: {
        base: 'bg-brand text-white hover:bg-brand-700 active:bg-brand disabled:bg-neutral-300',
      },
      outline: {
        base: 'bg-white text-brand hover:bg-brand-100 active:bg-white disabled:bg-white disabled:text-neutral-300',
      },
      flat: {
        base: 'p-2 text-neutral hover:text-brand-700 active:text-brand disabled:text-neutral-300',
      },
    },
  },
  compoundVariants: [
    {
      variant: ['solid', 'outline'],
      class:
        'border-2 border-brand px-6 py-4 shadow-md hover:border-brand-700 active:border-brand disabled:border-neutral-300 disabled:shadow-none',
    },
  ],
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
  const classes = button({ variant });

  return (
    <button className={classes.base({ className })} type={type} {...props}>
      {children}
    </button>
  );
}
