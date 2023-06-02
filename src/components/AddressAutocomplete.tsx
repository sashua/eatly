"use client";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent } from "react";
import usePlacesAutocomplete, {
  LatLng,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

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
      className={clsx("relative", className)}
      name="name"
      defaultValue={defaultValue}
      disabled={!ready}
      onChange={handleSelect}
    >
      <Combobox.Input
        className={clsx(
          "w-full px-6 py-3 transition-colors bg-white border outline-none peer rounded-xl disabled:bg-neutral-200",
          isError
            ? "border-red-400 focus:border-red-400"
            : "focus:border-violet-700"
        )}
        placeholder=" "
        required={required}
        onChange={handleChange}
      />
      <Combobox.Label
        className={clsx(
          "absolute top-0 px-1 text-xs leading-none transition-all -translate-y-1/2 bg-white peer-focus:text-xs peer-focus:top-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm left-5 peer-focus:bg-white",
          isError ? "text-red-400" : "text-gray-400 peer-focus:text-violet-700"
        )}
      >
        {placeholder}
      </Combobox.Label>
      <Combobox.Options className="absolute inset-x-0 overflow-hidden translate-y-full shadow-md bg-violet-50 -bottom-2 rounded-xl">
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <Combobox.Option
              className="px-6 py-1.5 text-gray-500 transition-colors cursor-pointer line-clamp-1 ui-active:text-violet-800 ui-active:bg-violet-200"
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
