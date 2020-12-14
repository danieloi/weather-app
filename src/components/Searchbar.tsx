import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ACCESS_KEY, generateLocationId } from "../middleware/api";
import List from "./List";
const WEATHERSTACK_ENDPOINT = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=`;

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsFetching(true);

    try {
      const response = await fetch(`${WEATHERSTACK_ENDPOINT}${value}`);
      const jsonResponse = await response.json();
      setResults(jsonResponse);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  }

  function handleClearClick() {
    setResults(null);
  }

  function renderResult(result: any) {
    const { name, country } = result.location;
    const slug = generateLocationId(result);
    return (
      <div>
        <Link className="pv2  db b" to={slug}>
          {name}, {country}
        </Link>
      </div>
    );
  }

  return (
    <div className="w5 relative ">
      <form onSubmit={handleSubmit} className="">
        <div className="flex w-100 justify-between">
          <input
            placeholder='Type and hit "Search"'
            className="ba  ph2"
            type="text"
            onChange={handleChange}
            value={value}
          />
          <button className="bg-white b " type="submit">
            Search
          </button>
        </div>
      </form>
      {results ? (
        <div className="absolute bg-white ba br2 pa3 mt2 w-100">
          <p className="fw5 f6">Search Results: </p>
          {renderResult(results)}
          <div className="flex justify-center pt3">
            <button className="bg-white b" onClick={handleClearClick}>
              Clear
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}