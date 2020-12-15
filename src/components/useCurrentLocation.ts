import slugify from "@sindresorhus/slugify";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ACCESS_KEY } from "../middleware/api";

const WEATHERSTACK_ENDPOINT = `https://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=`;

export default function useCurrentLocation() {
  const history = useHistory();

  useEffect(() => {
    async function fetchCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude.toFixed(3);
          const longitude = position.coords.longitude.toFixed(3);
          /**
           * find closest coordinates
           */

          const response = await fetch(
            `${WEATHERSTACK_ENDPOINT}${latitude},${longitude}`
          );

          const json = await response.json();
          const nameAndCountryString = `${json.location.name} ${json.location.country}`;

          const slug = slugify(nameAndCountryString);

          history.push(`/${slug}`);
        });
      }
    }

    fetchCurrentLocation();
  }, [history]);
}
