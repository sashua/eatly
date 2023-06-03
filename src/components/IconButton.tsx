import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { IconType } from 'react-icons';

interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  variant?: 'solid' | 'outline';
  icon: IconType;
}

export function IconButton({
  className,
  variant = 'solid',
  type = 'button',
  icon: Icon,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-xl border border-gray-700 p-2 shadow transition-colors hover:border-gray-600 active:border-gray-700 disabled:border-gray-400 disabled:shadow-none',
        {
          'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-700 disabled:bg-gray-400':
            variant === 'solid',
          'text-gray-700 hover:bg-gray-100 active:bg-white disabled:bg-white disabled:text-gray-400':
            variant === 'outline',
        },
        className
      )}
      type={type}
      {...props}
    >
      <Icon className="h-[1.25em] w-[1.25em]" />
    </button>
  );
}
