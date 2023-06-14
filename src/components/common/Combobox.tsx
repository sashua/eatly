'use client';

import { Combobox as HeadlessCombobox } from '@headlessui/react';
import { Fragment, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const combobox = tv({
  slots: {
    base: 'relative z-30',
    input:
      'peer w-full rounded-xl border bg-white px-6 py-3 outline-none transition-colors focus:border-brand-700 disabled:bg-neutral-200 focus:aria-invalid:border-error',
    label:
      'absolute left-5 top-0 -translate-y-1/2 bg-white px-1 text-xs leading-none text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:text-brand-700 peer-focus:peer-aria-invalid:text-error',
    error:
      'absolute bottom-0 right-5 translate-y-1/2 bg-white px-1 text-xs text-error',
    options:
      'absolute inset-x-0 -bottom-2 translate-y-full overflow-hidden rounded-xl bg-brand-50 shadow-md',
    option:
      'line-clamp-1 cursor-pointer px-6 py-1.5 text-neutral-500 transition-colors ui-active:bg-brand-200 ui-active:text-brand-800',
  },
});

export interface ComboboxProps {
  className?: string;
  name: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  error?: string;
  options?: string[];
  onBlur: () => void;
  onChange: (value: string) => void;
  onInput: (value: string) => void;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(
    { className, placeholder, error, options = [], onBlur, onInput, ...props },
    ref
  ) {
    const classes = combobox();
    return (
      <HeadlessCombobox
        as="div"
        className={classes.base({ className })}
        {...props}
      >
        <HeadlessCombobox.Input as={Fragment}>
          <input
            type="text"
            ref={ref}
            className={classes.input()}
            placeholder=" "
            onBlur={onBlur}
            onChange={e => onInput(e.target.value)}
          />
        </HeadlessCombobox.Input>
        <HeadlessCombobox.Label className={classes.label()}>
          {placeholder}
        </HeadlessCombobox.Label>
        {error && <p className={classes.error()}>{error}</p>}

        <HeadlessCombobox.Options className={classes.options()}>
          {options.map(value => (
            <HeadlessCombobox.Option
              className={classes.option()}
              key={value}
              value={value}
            >
              {value}
            </HeadlessCombobox.Option>
          ))}
        </HeadlessCombobox.Options>
      </HeadlessCombobox>
    );
  }
);
