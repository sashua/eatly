import { ComponentPropsWithoutRef } from 'react';
import { IconType } from 'react-icons';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  slots: {
    base: 'flex items-center gap-2 rounded-2xl font-medium transition-colors',
    icon: 'h-[1.25em] w-[1.25em]',
  },
  variants: {
    variant: {
      solid: {
        base: 'bg-brand text-white hover:bg-brand-700 active:bg-brand disabled:bg-neutral-300',
        icon: '',
      },
      outline: {
        base: 'bg-white text-brand hover:bg-brand-100 active:bg-white disabled:bg-white disabled:text-neutral-300',
        icon: '',
      },
      flat: {
        base: 'p-2 text-neutral hover:text-brand-700 active:text-brand disabled:text-neutral-300',
        icon: '',
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
    ComponentPropsWithoutRef<'button'> {
  icon?: IconType;
}

export function Button({
  className,
  variant,
  type = 'button',
  icon: Icon,
  children,
  ...props
}: ButtonProps) {
  const classes = button({ variant });

  return (
    <button className={classes.base({ className })} type={type} {...props}>
      {children}
      {Icon && <Icon className={classes.icon()} />}
    </button>
  );
}
