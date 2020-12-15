import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { generateLocationId } from "../middleware/api";
import { City } from "../reducers/cities";
import { toggleCityCategory, loadCity } from "../actions";
import { useEffect } from "react";

type OwnProps = {
  city: City;
};

const connector = connect(null, { toggleCityCategory, loadCity });

type PropsFromRedux = ConnectedProps<typeof connector>;

function CityListItem({
  city,
  toggleCityCategory,
  loadCity,
}: OwnProps & PropsFromRedux) {
  const slug = generateLocationId(city);

  /**
   * fetch details for default cities
   */
  useEffect(() => {
    loadCity(slug, ["current"]);
  }, [slug, loadCity]);

  function handleStarClick() {
    toggleCityCategory({
      id: city.id,
      category: city.isFavorite ? "unfavorite" : "favorite",
    });
  }

  function handleBookmarkClick() {
    toggleCityCategory({
      id: city.id,
      category: city.isBookmarked ? "unbookmark" : "bookmark",
    });
  }

  return (
    <div className="w5  ph3 pv3 bb b mb1 bg-white b--gray flex justify-between">
      <div className="flex flex-column">
        <Link
          style={{ width: "10rem" }}
          to={`/${slug}`}
          className="f6 fw5 mb2 truncate"
        >
          {city.location?.name}, {city.location?.country}
        </Link>
        {city.current ? (
          <p className="f5 fw6">
            {city.current?.temperature} <span className="f5">°c</span>
          </p>
        ) : null}
      </div>
      <div className="flex flex-column">
        <button
          onClick={handleStarClick}
          className="ph1 f7 w3 bg-white ba mb2 b--light-silver"
        >
          {city.isFavorite ? "unstar" : "star"}
        </button>
        <button
          onClick={handleBookmarkClick}
          className="f7 w3 bg-white ba b--light-silver"
        >
          {city.isBookmarked ? "unmark" : "mark"}
        </button>
      </div>
    </div>
  );
}

export default connector(CityListItem);
