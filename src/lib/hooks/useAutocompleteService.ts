import { useCallback, useState } from 'react';
import { useDebounce } from 'react-use';
import { useMapStore } from '../store';

export function useAutocompleteService() {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const autocompleteService = useMapStore(s => s.autocompleteService);

  useDebounce(
    async () => {
      const input = inputValue.trim();
      if (input.length < 3 || !autocompleteService) {
        return;
      }
      const res = await autocompleteService.getPlacePredictions({
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
