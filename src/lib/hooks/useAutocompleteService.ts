import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { googleMaps } from '../googleMaps';

export function useAutocompleteService() {
  const serviceRef = useRef<google.maps.places.AutocompleteService>();
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  useEffect(() => {
    if (!serviceRef.current) {
      googleMaps
        .importLibrary('places')
        .then(
          places => (serviceRef.current = new places.AutocompleteService())
        );
    }
  }, []);

  useDebounce(
    async () => {
      const input = inputValue.trim();
      if (input.length < 3 || !serviceRef.current) {
        return;
      }
      const res = await serviceRef.current.getPlacePredictions({
        input: input,
        componentRestrictions: { country: 'ua' },
        language: 'uk',
        region: 'ua',
        types: ['address'],
      });
      setPredictions(res.predictions);
    },
    1000,
    [inputValue]
  );

  const setInput = useCallback((input: string) => {
    setInputValue(input);
    if (!input) {
      setPredictions([]);
    }
  }, []);

  return { predictions, setInput };
}
