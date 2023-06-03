import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isError?: Boolean;
}

export function Input({
  className,
  placeholder,
  isError,
  ...props
}: InputProps) {
  return (
    <label className={clsx('relative', className)}>
      <input
        className={clsx(
          'peer w-full rounded-xl border bg-white px-6 py-3 outline-none transition-colors disabled:bg-neutral-200',
          isError
            ? 'border-red-400 focus:border-red-400'
            : 'focus:border-violet-700'
        )}
        placeholder=" "
        {...props}
      />
      <span
        className={clsx(
          'absolute left-5 top-0 -translate-y-1/2 bg-white px-1 text-xs leading-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs',
          isError ? 'text-red-400' : 'text-gray-400 peer-focus:text-violet-700'
        )}
      >
        {placeholder}
      </span>
    </label>
  );
}
