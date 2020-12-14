const fs = require("fs");
const fetch = require("node-fetch");
const LargestCitiesByPopulation = [
  "Tokyo, Japan",
  "Delhi, India",
  "Shanghai, China",
  "Sao Paulo, Brazil",
  "Mexico City, Mexico",
  "Cairo, Egypt",
  "Dhaka, Bangladesh",
  "Mumbai, India",
  "Beijing, China",
  "Osaka, Japan",
  "Karachi,	Pakistan",
  "Chongqing, China",
  "Istanbul, Turkey",
  "Buenos Aires, Argentina",
  "Kolkata, India",
];

const ACCESS_KEY = "06e5a1e4a51875d41289eadaf5e6e591";

const WEATHERSTACK_ENDPOINT = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=`;

async function fetchCityDetails() {
  try {
    const responses = await Promise.all(
      LargestCitiesByPopulation.map((city) =>
        fetch(`${WEATHERSTACK_ENDPOINT}${city}`)
      )
    );

    const cities = await Promise.all(
      responses.map((response) => response.json())
    );

    fs.writeFileSync("./defaultCities.json", JSON.stringify(cities));
  } catch (error) {
    console.log({ error });
  }
}

fetchCityDetails();
