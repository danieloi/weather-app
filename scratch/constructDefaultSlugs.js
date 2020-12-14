const fs = require("fs");
const slugify = require("@sindresorhus/slugify");

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

const slugs = LargestCitiesByPopulation.map(slugify);

fs.writeFileSync("./slugifiedCities", JSON.stringify(slugs));
