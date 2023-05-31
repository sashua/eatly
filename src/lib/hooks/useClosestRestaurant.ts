import { useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import { config } from "../config";
import { useOrderStore, usePreloadStore } from "../store";

export function useClosestRestaurant(map?: google.maps.Map) {
  const restaurants = usePreloadStore((store) => store.restaurants);
  const [
    restaurantId,
    restaurantLocation,
    clientLocation,
    deliveryRoute,
    setRestaurantLocation,
  ] = useOrderStore((store) => [
    store.restaurantId,
    store.restaurantLocation,
    store.clientLocation,
    store.deliveryRoute,
    store.setRestaurantLocation,
  ]);

  const restaurant = restaurants.find(({ id }) => id === restaurantId);

  useEffect(() => {
    if (!map || !restaurant || !clientLocation) {
      return;
    }

    const service = new google.maps.places.PlacesService(map);

    const request = {
      query: `Ресторан ${restaurant.name}`,
      fields: ["name", "formatted_address", "geometry"],
      locationBias: {
        radius: config.deliveryMaxRadius,
        center: clientLocation.latLng,
      },
    };

    service.findPlaceFromQuery(request, (result) => {
      const address = result?.[0].formatted_address;
      const latLng = result?.[0].geometry?.location?.toJSON();

      if (!address || !latLng) {
        setRestaurantLocation();
        return;
      }

      setRestaurantLocation({
        address,
        latLng,
      });
    });
  }, [clientLocation, map, restaurant, setRestaurantLocation]);

  return { restaurant, restaurantLocation, deliveryRoute };
}
