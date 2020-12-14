import { merge, omit } from "lodash";
import {
  CitiesEntityActionTypes,
  FetchCityRequestAction,
  FetchCitySuccessAction,
  FetchCityFailureAction,
  ToggleCityCategoryAction,
} from "../actions";

export type City = {
  location?: {
    name?: string;
    country?: string;
  };
  current?: {
    observationTime?: string;
    temperature?: number;
    feelslike: number;
    weatherIcons: string[];
    weatherDescriptions: string[];
  };
  id: string;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  fetchStatus: "loading" | "loaded" | "failed" | "stale";
  error: string | null;
};

export type CitiesEntityState = Record<string, City>;

/**
 * these all lack the 'current' property so when they
 * render in CityListItem, they trigger a rerender
 */
const initialState: CitiesEntityState = {
  "tokyo-japan": {
    id: "tokyo-japan",
    location: {
      name: "Tokyo",
      country: "Japan",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "delhi-india": {
    id: "delhi-india",
    location: {
      name: "Delhi",
      country: "India",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "shanghai-china": {
    id: "shanghai-china",
    location: {
      name: "Shanghai",
      country: "China",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "sao-paulo-brazil": {
    id: "sao-paulo-brazil",
    location: {
      name: "Sao Paulo",
      country: "Brazil",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "mexico-city-mexico": {
    id: "mexico-city-mexico",
    location: {
      name: "Mexico City",
      country: "Mexico",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "cairo-egypt": {
    id: "cairo-egypt",
    location: {
      name: "Cairo",
      country: "Egypt",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "dhaka-bangladesh": {
    id: "dhaka-bangladesh",
    location: {
      name: "Dhaka",
      country: "Bangladesh",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "mumbai-india": {
    id: "mumbai-india",
    location: {
      name: "Mumbai",
      country: "India",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "beijing-china": {
    id: "beijing-china",
    location: {
      name: "Beijing",
      country: "China",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "higashi-osaka-japan": {
    id: "higashi-osaka-japan",
    location: {
      name: "Higashi-Osaka",
      country: "Japan",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "karachi-pakistan": {
    id: "karachi-pakistan",
    location: {
      name: "Karachi",
      country: "Pakistan",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "chongqing-china": {
    id: "chongqing-china",
    location: {
      name: "Chongqing",
      country: "China",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "istanbul-turkey": {
    id: "istanbul-turkey",
    location: {
      name: "Istanbul",
      country: "Turkey",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "buenos-aires-argentina": {
    id: "buenos-aires-argentina",
    location: {
      name: "Buenos Aires",
      country: "Argentina",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
  "kolkata-india": {
    id: "kolkata-india",
    location: {
      name: "Kolkata",
      country: "India",
    },
    isFavorite: false,
    isBookmarked: true,
    fetchStatus: "loaded",
    error: null,
  },
};

const toggleCityCategory = (
  state = initialState,
  action: ToggleCityCategoryAction
) => {
  const { payload } = action;

  switch (payload.category) {
    case "bookmark":
      return merge({}, state, {
        [payload.id]: {
          ...state[payload.id],
          isBookmarked: true,
        },
      });
    case "unbookmark":
      return merge({}, state, {
        [payload.id]: {
          ...state[payload.id],
          isBookmarked: false,
        },
      });
    case "favorite":
      return merge({}, state, {
        [payload.id]: {
          ...state[payload.id],
          isFavorite: true,
        },
      });
    case "unfavorite":
      return merge({}, state, {
        [payload.id]: {
          ...state[payload.id],
          isFavorite: false,
        },
      });

    default:
      return state;
  }
};

const fetchCityRequest = (
  state = initialState,
  action: FetchCityRequestAction
) => {
  const { slug } = action;

  const city = { [slug]: { fetchStatus: "loading", id: slug, error: null } };

  return merge({}, state, city);
};
const fetchCityFailure = (
  state = initialState,
  action: FetchCityFailureAction
) => {
  const { slug, error } = action;

  const city = {
    [slug]: {
      id: slug,
      fetchStatus: "failed",
      error: error.message,
    },
  };

  return merge({}, state, city);
};

const fetchCitySuccess = (
  state = initialState,
  action: FetchCitySuccessAction
) => {
  const { response } = action;

  return merge({}, state, response.entities.cities);
};

export const cities = (
  state = initialState,
  action: CitiesEntityActionTypes
) => {
  switch (action.type) {
    case "entities/FETCH_CITY_REQUEST":
      return fetchCityRequest(state, action);
    case "entities/FETCH_CITY_SUCCESS":
      return fetchCitySuccess(state, action);
    case "entities/FETCH_CITY_FAILURE":
      return fetchCityFailure(state, action);
    case "entities/TOGGLE_CITY_CATEGORY":
      return toggleCityCategory(state, action);
    case "entities/DELETE_CITY":
      return omit(state, action.payload.id);

    default:
      return state;
  }
};
