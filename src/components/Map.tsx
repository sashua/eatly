'use client';

import { useEffect, useRef, useState } from 'react';
import { config } from '~/lib/config';
import { googleMaps } from '~/lib/googleMaps';

const mapOptions: google.maps.MapOptions = {
  backgroundColor: '#e7ebe5',
  center: config.map.defaultCenter,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoom: 13,
  zoomControl: false,
};

interface MapProps {
  className?: string;
}

export function Map({ className }: MapProps) {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (!ref.current || map) {
        return;
      }
      const { Map } = await googleMaps.importLibrary('maps');
      setMap(new Map(ref.current, mapOptions));
    })();
  }, [map]);

  return <div className={className} ref={ref}></div>;
}
