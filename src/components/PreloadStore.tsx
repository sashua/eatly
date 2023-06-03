'use client';

import { useEffect } from 'react';
import { PreloadState, usePreloadStore } from '~/lib/store';

interface PreloadStoreProps {
  values: PreloadState;
}

export function PreloadStore({ values }: PreloadStoreProps) {
  const setValues = usePreloadStore(store => store.set);

  useEffect(() => setValues(values), [setValues, values]);

  return null;
}
