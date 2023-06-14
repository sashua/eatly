'use client';

import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
} from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';
import { config } from '~/lib/config';
import { useOrderStore } from '~/lib/store';

interface MapProps {
  onLoad: (map: google.maps.Map) => void;
}

export function Map({ onLoad }: MapProps) {
  const [restaurantLatLng, clientLatLng, deliveryRoute, setDeliveryRoute] =
    useOrderStore(store => [
      store.restaurantLocation?.latLng,
      store.clientLocation?.latLng,
      store.deliveryRoute,
      store.setDeliveryRoute,
    ]);

  const handleRouteReady = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => setDeliveryRoute(status === 'OK' ? result : null),
    [setDeliveryRoute]
  );

  const centerLatLng = useMemo(
    () => clientLatLng ?? config.defaultMapCenter,
    [clientLatLng]
  );

  const mapOptions = useMemo(
    () => ({
      backgroundColor: '#e7ebe5',
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
    }),
    []
  );

  const directionsServiceOptions = useMemo(
    () =>
      restaurantLatLng && clientLatLng
        ? {
            origin: restaurantLatLng,
            destination: clientLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
          }
        : null,
    [clientLatLng, restaurantLatLng]
  );

  const directionsRendererOptions = useMemo(
    () => ({
      directions: deliveryRoute,
      preserveViewport: false,
    }),
    [deliveryRoute]
  );

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      zoom={13}
      center={centerLatLng}
      options={mapOptions}
      onLoad={onLoad}
    >
      {!deliveryRoute && restaurantLatLng && (
        <Marker position={restaurantLatLng} />
      )}
      {!deliveryRoute && clientLatLng && <Marker position={clientLatLng} />}
      {directionsServiceOptions && (
        <DirectionsService
          options={directionsServiceOptions}
          callback={handleRouteReady}
        />
      )}
      {deliveryRoute && (
        <DirectionsRenderer options={directionsRendererOptions} />
      )}
    </GoogleMap>
  );
}
