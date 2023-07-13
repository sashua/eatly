import { create } from 'zustand';

type MapState = {
  map?: google.maps.Map;
  autocompleteService?: google.maps.places.AutocompleteService;
  placesService?: google.maps.places.PlacesService;
  directionsService?: google.maps.DirectionsService;
  directionsRenderer?: google.maps.DirectionsRenderer;
  geocoder?: google.maps.Geocoder;
};

type MapAction = {
  setMapState: (state: Required<MapState>) => void;
};

export const useMapStore = create<MapState & MapAction>()(set => ({
  setMapState: state => set({ ...state }),
}));
