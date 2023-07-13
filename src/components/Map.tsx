'use client';

import { useEffect, useRef } from 'react';
import { config } from '~/lib/config';
import { googleMaps } from '~/lib/googleMaps';
import { useRestaurantQuery } from '~/lib/hooks';
import { useMapStore, useOrderStore, useStore } from '~/lib/store';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const map = useMapStore(s => s.map);
  const placesService = useMapStore(s => s.placesService);
  const directionsService = useMapStore(s => s.directionsService);
  const directionsRenderer = useMapStore(s => s.directionsRenderer);
  const geocoder = useMapStore(s => s.geocoder);
  const setMapState = useMapStore(s => s.setMapState);

  const address = useStore(useOrderStore, s => s.address);
  const location = useStore(useOrderStore, s => s.location);
  const restaurantLocation = useStore(useOrderStore, s => s.restaurantLocation);
  const setLocationInfo = useOrderStore(s => s.setLocationInfo);
  const setDeliveryInfo = useOrderStore(s => s.setDeliveryInfo);

  const dishes = useStore(useOrderStore, s => s.dishes);

  const { data: restaurant } = useRestaurantQuery(dishes?.[0]?.restaurantId);

  // init google map and libraries
  useEffect(() => {
    (async () => {
      if (!containerRef.current) {
        return;
      }
      const [maps, places, routes] = await Promise.all([
        googleMaps.importLibrary('maps'),
        googleMaps.importLibrary('places'),
        googleMaps.importLibrary('routes'),
      ]);

      const newMap = new maps.Map(containerRef.current, mapOptions);
      const autocompleteService = new places.AutocompleteService();
      const placesService = new places.PlacesService(newMap);
      const directionsService = new routes.DirectionsService();
      const directionsRenderer = new routes.DirectionsRenderer({ map: newMap });
      const geocoder = new google.maps.Geocoder();

      setMapState({
        map: newMap,
        autocompleteService,
        placesService,
        directionsService,
        directionsRenderer,
        geocoder,
      });
    })();
  }, [setMapState]);

  // get client location
  useEffect(() => {
    (async () => {
      if (!address || !map || !geocoder) {
        return;
      }

      const response = await geocoder.geocode({
        address,
        region: 'ua',
        componentRestrictions: { country: 'ua' },
      });
      const location = response.results[0].geometry.location.toJSON();
      map.setCenter(location);
      setLocationInfo({
        location,
        restaurantAddress: null,
        restaurantLocation: null,
      });
      setDeliveryInfo({ deliveryDistance: null, deliveryTime: null });
    })();
  }, [address, geocoder, map, setDeliveryInfo, setLocationInfo]);

  // find closest restaurant location
  useEffect(() => {
    if (!location || !restaurant || !placesService) {
      return;
    }
    placesService.findPlaceFromQuery(
      {
        query: restaurant.name,
        fields: ['name', 'formatted_address', 'geometry'],
        locationBias: { center: location, radius: config.map.searchRadius },
      },
      results => {
        setLocationInfo({
          restaurantAddress: results?.[0]?.formatted_address,
          restaurantLocation: results?.[0]?.geometry?.location?.toJSON(),
        });
      }
    );
  }, [location, placesService, restaurant, setLocationInfo]);

  // calculate delivery route
  useEffect(() => {
    (async () => {
      if (
        !location ||
        !restaurantLocation ||
        !directionsService ||
        !directionsRenderer
      ) {
        return;
      }
      const result = await directionsService.route({
        origin: restaurantLocation,
        destination: location,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      directionsRenderer.setDirections(result);
      setDeliveryInfo({
        deliveryDistance: result.routes[0]?.legs[0]?.distance,
        deliveryTime: result.routes[0]?.legs[0]?.duration,
      });
    })();
  }, [
    directionsRenderer,
    directionsService,
    location,
    restaurantLocation,
    setDeliveryInfo,
  ]);

  return <div className={className} ref={containerRef}></div>;
}
