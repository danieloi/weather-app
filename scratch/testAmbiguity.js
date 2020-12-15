const fs = require("fs");
const fetch = require("node-fetch");

const ACCESS_KEY = "06e5a1e4a51875d41289eadaf5e6e591";

const WEATHERSTACK_ENDPOINT = `https://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=`;

async function fetchCityDetails() {
  try {
    /**
     * there are many Londons
     * See if it sends back all of them
     */
    const response = await fetch(
      `${WEATHERSTACK_ENDPOINT}london-united-kingdom`
    );

    const city = await response.json();

    fs.writeFileSync("./ambiguityTest.json", JSON.stringify(city));
  } catch (error) {
    console.log({ error });
  }
}

fetchCityDetails();
