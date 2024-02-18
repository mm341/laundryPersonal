import MainApi from "@/api/MainApi";

export const GoogleApi = {
  placeApiAutocomplete: (search: string) => {
    if (search && search !== "") {
      return MainApi.get(
        `/customer/addresses/place-api-autocomplete?search_text=${search}`
      );
    }
  },
  placeApiDetails: (placeId: string) => {
    if (placeId) {
      return MainApi.get(`/customer/addresses/place-api-details?place_id=${placeId}`);
    }
  },

  distanceApi: (
    origin: { latitude?: string; longitude?: string },
    destination: {
      latitude?: string;
      longitude?: string;
      lat?: string;
      lng?: string;
    }
  ) => {
    if (origin?.latitude && destination?.lat) {
      return MainApi.get(
        `/customer/distance-api?origin_lat=${origin.latitude}&origin_lng=${
          origin.longitude
        }&destination_lat=${
          destination.lat ? destination?.lat : destination?.latitude
        }&destination_lng=${
          destination.lng ? destination?.lng : destination?.longitude
        }`
      );
    }
  },
  geoCodeApi: (location: { lat: string; lng: string }) => {
    return MainApi.get(
      `/api/v1/config/geocode-api?lat=${location?.lat}&lng=${location?.lng}`
    );
  },
};
