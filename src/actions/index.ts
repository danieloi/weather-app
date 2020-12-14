import { Schema } from "normalizr";
import { CALL_API, Schemas } from "../middleware/api";
import { AppThunk } from "../reducers";
import { City } from "../reducers/cities";
import { Note } from "../reducers/notes";

export type RootActionType = NotesEntityActionTypes | CitiesEntityActionTypes;

export type NotesEntityActionTypes =
  | AddNoteAction
  | DeleteNoteAction
  | EditNoteAction;

export type CitiesEntityActionTypes =
  | ToggleCityCategoryAction
  | DeleteCityAction
  | FetchCityRequestAction
  | FetchCitySuccessAction
  | FetchCityFailureAction;

const ADD_NOTE = "entities/ADD_NOTE";
const DELETE_NOTE = "entities/DELETE_NOTE";
const EDIT_NOTE = "entities/EDIT_NOTE";

const TOGGLE_CITY_CATEOGORY = "entities/TOGGLE_CITY_CATEGORY";
const DELETE_CITY = "entities/DELETE_CITY";
const FETCH_CITY_REQUEST = "entities/FETCH_CITY_REQUEST";
const FETCH_CITY_SUCCESS = "entities/FETCH_CITY_SUCCESS";
const FETCH_CITY_FAILURE = "entities/FETCH_CITY_FAILURE";

export type FetchActionType = {
  type: typeof CALL_API;
  slug: string;
  [CALL_API]: {
    types: [
      FetchRequestType: string,
      FetchSuccessType: string,
      FetchFailureType: string
    ];
    schema: Schema;
  };
};

export type FetchCityRequestAction = {
  type: typeof FETCH_CITY_REQUEST;
  slug: string;
};

export type FetchCitySuccessAction = {
  type: typeof FETCH_CITY_SUCCESS;
  slug: string;
  response: { entities: { cities: Record<string, City> } };
};

export type FetchCityFailureAction = {
  type: typeof FETCH_CITY_FAILURE;
  slug: string;
  error: {
    message: string;
  };
};

export type AddNoteAction = {
  type: typeof ADD_NOTE;
  payload: {
    content: string;
    cityId: string;
    cityName: string;
  };
};

export type DeleteNoteAction = {
  type: typeof DELETE_NOTE;
  payload: {
    id: string;
  };
};

export type EditNoteAction = {
  type: typeof EDIT_NOTE;
  payload: Note;
};

export type ToggleCityCategoryAction = {
  type: typeof TOGGLE_CITY_CATEOGORY;
  payload: {
    id: string;
    category: "bookmark" | "favorite" | "unbookmark" | "unfavorite";
  };
};

export type DeleteCityAction = {
  type: typeof DELETE_CITY;
  payload: {
    id: string;
  };
};

export const addNote = (payload: AddNoteAction["payload"]): AddNoteAction => ({
  type: ADD_NOTE,
  payload,
});

export const deleteNote = (
  payload: DeleteNoteAction["payload"]
): DeleteNoteAction => ({
  type: DELETE_NOTE,
  payload,
});

export const editNote = (
  payload: EditNoteAction["payload"]
): EditNoteAction => ({
  type: EDIT_NOTE,
  payload,
});

export const toggleCityCategory = (
  payload: ToggleCityCategoryAction["payload"]
): ToggleCityCategoryAction => ({
  type: TOGGLE_CITY_CATEOGORY,
  payload,
});

export const deleteCity = (payload: DeleteCityAction["payload"]) => ({
  type: DELETE_CITY,
  payload,
});

/**
 * Fetches a single city from WeatherStack API.
 * Relies on the custom API middleware defined in ../middleware/api.js.
 */
export const fetchCity = (slug: string): FetchActionType => ({
  type: CALL_API,
  slug,
  [CALL_API]: {
    types: [FETCH_CITY_REQUEST, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE],
    schema: Schemas.CITY,
  },
});

export const loadCity = (
  slug: string,
  requiredFields: string[] = [],
  skipCache: boolean = false
): AppThunk => (dispatch, getState) => {
  if (skipCache) {
    return dispatch(fetchCity(slug));
  }
  const cachedCities = getState().entities.cities;
  const cachedCity = cachedCities ? cachedCities[slug] : {};

  if (
    cachedCity &&
    requiredFields.every((key) => cachedCity.hasOwnProperty(key))
  ) {
    return null;
  }

  return dispatch(fetchCity(slug));
};
