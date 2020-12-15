import { normalize, Schema, schema } from "normalizr";
import { camelizeKeys } from "humps";
import { Middleware } from "redux";
import { RootState } from "../reducers";
import slugify from "@sindresorhus/slugify";

const API_ROOT = "https://api.weatherstack.com/";

/**
 * TODO put access_key in backend
 */
export const ACCESS_KEY = "06e5a1e4a51875d41289eadaf5e6e591";

/**
 * Fetches an API response and normalizes the
 * result JSON according to schema.
 * This makes every API response have the same
 * shape, regardless of how nested it was.
 */

export const CALL_API = "CALL_API";

const callApi = (slug: string, schema: Schema) => {
  /**
   * extract lat and long values from slug
   */
  const fullUrl = `${API_ROOT}/current?access_key=${ACCESS_KEY}&query=${slug}`;

  return fetch(fullUrl).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return Object.assign({}, normalize(camelizedJson, schema));
    })
  );
};

/**
 * We use this Normalizr schemas to transform API responses
 * from a nested form to a flat form where cities and
 * notes are placed in `entities`, and nested
 * JSON objects are replaced with their IDs.
 * This is very convenient for consumption by reducers,
 * because we can easily build a normalized tree
 * and keep it updated as we fetch more data.
 */

export function generateLocationId(apiResult: any) {
  const nameAndCountryString = `${apiResult.location.name} ${apiResult.location.country}`;

  return slugify(nameAndCountryString);
}

const citySchema = new schema.Entity(
  "cities",
  {},
  {
    idAttribute: (city) => {
      // const nameAndCountryString = `${city.location.name} ${city.location.country}`;
      // const slug = slugify(nameAndCountryString);

      // return slug;

      return generateLocationId(city);
    },
    processStrategy: (entity) => ({
      ...entity,
      id: generateLocationId(entity),
      isFavorite: false,
      isBookmarked: true,
      fetchStatus: "loaded",
      error: null,
    }),
  }
);

/**
 * Schemas for api responses
 */
export const Schemas = {
  CITY: citySchema,
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
const middleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  const { slug } = action;
  const { schema, types } = callAPI;

  const actionWith = (data: Record<string, any>) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(slug, schema).then(
    (response) =>
      next(
        actionWith({
          response,
          type: successType,
        })
      ),
    (error) =>
      next(
        actionWith({
          type: failureType,
          error: error.message || "Something bad happened",
        })
      )
  );
};

export default middleware;
