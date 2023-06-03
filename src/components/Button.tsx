import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'solid' | 'outline';
}

export function Button({
  className,
  variant = 'solid',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-2xl border border-violet-700 px-6 py-3 shadow-md transition-colors hover:border-violet-600 active:border-violet-700 disabled:border-violet-400 disabled:shadow-none',
        {
          'bg-violet-700 text-white hover:bg-violet-600 active:bg-violet-700 disabled:bg-violet-400':
            variant === 'solid',
          'text-violet-700 hover:bg-violet-100 active:bg-white disabled:bg-white disabled:text-violet-400':
            variant === 'outline',
        },
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
