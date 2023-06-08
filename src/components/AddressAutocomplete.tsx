'use client';

import { Combobox } from '@headlessui/react';
import { ChangeEvent } from 'react';
import usePlacesAutocomplete, {
  LatLng,
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

interface AddressAutocompleteProps {
  className?: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  required?: boolean;
  isError?: boolean;
  onSelect: ({ address, latLng }: { address: string; latLng: LatLng }) => void;
}

export function AddressAutocomplete({
  className,
  name,
  placeholder,
  defaultValue,
  required,
  isError,
  onSelect,
}: AddressAutocompleteProps) {
  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const latLng = getLatLng(results[0]);
    onSelect({ address, latLng });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Combobox
      as="div"
      className={'relative ' + className}
      name="name"
      defaultValue={defaultValue}
      disabled={!ready}
      onChange={handleSelect}
    >
      <Combobox.Input
        className={
          'peer w-full rounded-xl border bg-white px-6 py-3 outline-none transition-colors disabled:bg-neutral-200 ' +
          isError
            ? 'border-red-400 focus:border-red-400'
            : 'focus:border-violet-700'
        }
        placeholder=" "
        required={required}
        onChange={handleChange}
      />
      <Combobox.Label
        className={
          'absolute left-5 top-0 -translate-y-1/2 bg-white px-1 text-xs leading-none transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs ' +
          isError
            ? 'text-red-400'
            : 'text-gray-400 peer-focus:text-violet-700'
        }
      >
        {placeholder}
      </Combobox.Label>
      <Combobox.Options className="bg-violet-50 absolute inset-x-0 -bottom-2 translate-y-full overflow-hidden rounded-xl shadow-md">
        {status === 'OK' &&
          data.map(({ place_id, description }) => (
            <Combobox.Option
              className="text-gray-500 ui-active:bg-violet-200 ui-active:text-violet-800 line-clamp-1 cursor-pointer px-6 py-1.5 transition-colors"
              key={place_id}
              value={description}
            >
              {description}
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
}
