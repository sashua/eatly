import { isError } from '@tanstack/react-query';
import { ComponentPropsWithoutRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const input = tv({
  slots: {
    base: 'relative',
    input:
      'peer w-full rounded-xl border bg-white px-6 py-3 outline-none transition-colors focus:border-brand-700 disabled:bg-neutral-200',
    label:
      'text-gray-400 absolute left-5 top-0 -translate-y-1/2 bg-white px-1 text-xs leading-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:text-brand-700',
  },
  variants: {
    error: {
      true: {
        input: 'border-red-400 focus:border-red-400',
        label: 'text-red-400',
      },
    },
  },
});

type InputVariants = VariantProps<typeof input>;

interface InputProps extends InputVariants, ComponentPropsWithoutRef<'input'> {}

export function Input({ className, placeholder, error, ...props }: InputProps) {
  const classes = input({ error });

  return (
    <label className={classes.base({ className })}>
      <input className={classes.input()} placeholder=" " {...props} />
      <span className={classes.label()}>{placeholder}</span>
    </label>
  );
}
