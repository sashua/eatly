import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const input = tv({
  slots: {
    base: 'relative',
    input:
      'peer w-full rounded-xl border bg-white px-6 py-3 outline-none transition-colors focus:border-brand-700 disabled:bg-neutral-200 focus:aria-invalid:border-error',
    label:
      'absolute left-5 top-0 -translate-y-1/2 bg-white px-1 text-xs leading-none text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:text-brand-700 peer-focus:peer-aria-invalid:text-error',
    error:
      'absolute bottom-0 right-5 translate-y-1/2 bg-white px-1 text-xs text-error',
  },
});

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, placeholder, error, ...props },
  ref
) {
  const classes = input();

  return (
    <label className={classes.base({ className })}>
      <input className={classes.input()} ref={ref} placeholder=" " {...props} />
      <span className={classes.label()}>{placeholder}</span>
      {error && <p className={classes.error()}>{error}</p>}
    </label>
  );
});
