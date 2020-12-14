const fs = require("fs");
const { camelizeKeys } = require("humps");
const { normalize, schema } = require("normalizr");

const citySchema = new schema.Entity(
  "cities",
  {},
  {
    idAttribute: (city) => {
      // const nameAndCountryString = `${city.location.name} ${city.location.country}`;
      // const slug = slugify(nameAndCountryString);

      // return slug;
      const latLon = `lat_${city.location.lat}_lon_${city.location.lon}`;

      return latLon;
    },
    processStrategy: (entity) => ({
      ...entity,
      isFavorite: false,
    }),
  }
);

const citiesArrSchema = [citySchema];

const defaultCities = camelizeKeys(
  JSON.parse(fs.readFileSync("./defaultCities.json"))
);

const normies = normalize(defaultCities, citiesArrSchema);

fs.writeFileSync("./normies.json", JSON.stringify(normies));
