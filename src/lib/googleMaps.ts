import { Loader } from '@googlemaps/js-api-loader';

export const googleMaps = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  libraries: ['places'],
  language: 'uk',
  region: 'ua',
});
