"use client";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useOrderStore } from "~/lib/store";

interface AddressAutocompleteProps {
  className?: string;
  placeholder: string;
}

export function AddressAutocomplete({
  className,
  placeholder,
}: AddressAutocompleteProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [clientAddress, setClientLocation] = useOrderStore((store) => [
    store.clientLocation?.address,
    store.setClientLocation,
  ]);

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const latLng = getLatLng(results[0]);
    setClientLocation({ address, latLng });
  };

  return (
    <Combobox
      as="div"
      className={clsx("relative", className)}
      // value={value}
      disabled={!ready}
      onChange={handleSelect}
      defaultValue={clientAddress}
    >
      <Combobox.Input
        className="w-full px-6 py-3 transition-colors bg-white border outline-none peer focus:border-violet-700 rounded-xl disabled:bg-neutral-200"
        placeholder=" "
        onChange={(e) => setValue(e.target.value)}
      />
      <Combobox.Label className="absolute top-0 px-1 text-xs leading-none text-gray-400 transition-all -translate-y-1/2 bg-white peer-focus:text-xs peer-focus:top-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm left-5 peer-focus:text-violet-700 peer-focus:bg-white">
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
